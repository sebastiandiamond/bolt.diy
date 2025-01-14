import { stripe } from '~/lib/services/stripe.server'; // Adjust the import path as needed
import type { ClientActionFunctionArgs } from '@remix-run/react';
export const action = async ({ request }: ClientActionFunctionArgs) => {
  const { userId }: { userId: string } = await request.json();

  if (!userId) {
    return Response.json({ error: 'User not authenticated' }, { status: 401 });
  }

  let customer: any;
  try {
    const customerResponse = await fetch(`${process.env.VITE_API_URL}/users/${userId}/customer`);
    if (!customerResponse.ok) {
      throw new Error('Failed to fetch customer');
    }
    customer = await customerResponse.json();
  } catch (err: any) {
    console.error(`Error fetching customer: ${err.message}`);
    return Response.json({ error: 'Unable to fetch customer' }, { status: 500 });
  }

  if (!customer?.customerIs) {
    try {
      // Create a new Stripe customer if none exists
      const newCustomer = await stripe.customers.create({
        metadata: {
          user_id: userId, // Attach your user ID for tracking
        },
      });

      // Save the new customer ID in your database
      const saveResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/customer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stripeCustomerId: newCustomer.id }),
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save Stripe customer ID');
      }

      customer = await saveResponse.json();
      console.log(customer);

      if (!customer) {
        throw new Error('Failed to save Stripe customer ID');
      }
    } catch (err: any) {
      console.error(`Error creating Stripe customer: ${err.message}`);
      return Response.json({ error: 'Unable to create Stripe customer' }, { status: 500 });
    }
  }

  try {
    // Create a billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.customerIs as string,

      return_url: import.meta.env.BILLING_RETURN_URL || 'http://localhost:5173', // Replace with your desired return URL
    });

    // Respond with the portal URL
    return Response.json({ url: portalSession.url });
  } catch (err: any) {
    console.error(`Error creating Billing Portal session: ${err.message}`);
    return Response.json({ error: 'Unable to create Billing Portal session' }, { status: 500 });
  }
};
