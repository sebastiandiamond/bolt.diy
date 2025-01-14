import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export const action = async ({ request }: { request: Request }) => {
  const { priceId, userId }: { priceId: string; userId: string } = await request.json();

  console.log('price id:', priceId, 'user id:', userId);
  if (!priceId || !userId) {
    return Response.json({ error: 'Missing price ID' }, { status: 400 });
  }

  // Fetch the customer from your backend
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
  console.log(customer);
  if (!customer?.customerIs) {
    try {
      // Create a new Stripe customer if none exists
      const newCustomer = await stripe.customers.create({
        metadata: {
          user_id: userId, // Attach your user ID for tracking
        },
      });
      console.log(newCustomer);
      // Save the new customer ID in your backend
      const saveResponse = await fetch(`${process.env.VITE_API_URL}/users/${userId}/customer`, {
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
    } catch (err: any) {
      console.error(`Error creating Stripe customer: ${err.message}`);
      return Response.json({ error: 'Unable to create Stripe customer' }, { status: 500 });
    }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      ...(customer.customerIs && { customer: customer.customerIs }),
      metadata: {
        userId, // Associate this session with the user
        priceId,
        quantity: 1,
      },
      success_url: `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.STRIPE_CANCEL_URL!,
    });

    return Response.json({ url: session.url });
  } catch (error: any) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
};
