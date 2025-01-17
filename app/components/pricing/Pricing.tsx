import { useState } from 'react';
import { Dialog, DialogRoot } from '../ui/Dialog';
import PricingCard from './Pricing-card';
import { Switch } from '../ui/Switch';
import { Link } from '@remix-run/react';

interface PricingProps {
  pricingDialog: boolean;
  setPricingDialog: (pricingDialog: boolean) => void;
}

const pricingData: Pricing[] = [
  {
    id: '1',
    price: 20,
    tokens: 10,
    description: 'Ideal for hobbyists and casual users for light, exploratory use.',
    annual: 216,
    priceId: 'price_1QhXKl6x8Ds2q65eCJE0DgB1',
  },
];

function PricingWindow({ pricingDialog, setPricingDialog }: PricingProps) {
  const [yearly, setYearly] = useState(false);
  const handleClose = () => {
    setPricingDialog(false);
    window.history.pushState(null, '', '/');
  };

  return (
    <DialogRoot open={pricingDialog}>
      <Dialog
        onBackdrop={handleClose}
        onClose={handleClose}
        className="max-w-[90vw] p-10 gap-10 dark:bg-black bg-white overflow-y-auto"
      >
        <div className="flex flex-col gap-5 items-center max-w-[580px] mx-auto mb-14">
          <h1 className="text-bolt-elements-textPrimary text-3xl md:text-5xl font-semibold">Pricing</h1>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-bolt-elements-textSecondary text-sm md:text-base font-regular">Annual Billing</span>
            <Switch checked={yearly} onCheckedChange={setYearly} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mb-10">
          {pricingData.map((pricing) => (
            <PricingCard key={pricing.id} pricing={pricing} yearly={yearly} />
          ))}
        </div>
      </Dialog>
    </DialogRoot>
  );
}

export default PricingWindow;
