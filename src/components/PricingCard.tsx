import { Button } from "@/components/hexta-ui/Button";
import { Badge } from "@/components/hexta-ui/Badge";

interface PricingCardProps {
    items: PricingItem[];
    price: string;
    title: string;
    popular?: boolean;
}
  
export interface PricingItem {
    features: string[];
}
  
export const PricingCard = ({
    items,
    title,
    price,
    popular,
}: PricingCardProps) => {
    return (
      <div
        className={`flex flex-col gap-1 p-8 bg-zinc-950 m-3 flex-grow rounded-lg relative border border-white ${
          !popular ? "border-opacity-10" : ""
        }`}
      >
        {popular && (
          <Badge className="w-fit text-xs absolute top-[-13px] left-1/2 -translate-x-1/2">
            Most Popular
          </Badge>
        )}
        <div>
          <h4 className="text-xl font-semibold opacity-80">{title}</h4>
          <p className="text-3xl font-black">{price}</p>
        </div>
        <div>
          {items.map((item, index) => (
            <div key={index}>
              <ul className="flex flex-col gap-1">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-1 text-[14px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4z"
                      />
                    </svg>
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="grow flex">
          <Button className="grow text-center items-center flex justify-center">
            Get Started
          </Button>
        </div>
      </div>
    );
};
