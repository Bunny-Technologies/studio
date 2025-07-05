import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userCoupons } from "@/lib/data";
import { Ticket } from "lucide-react";

export default function CouponsPage() {
  const coupons = userCoupons;

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Ticket className="h-8 w-8 text-accent" />
        <h1 className="font-headline text-3xl font-bold">Your Coupons</h1>
      </div>
      <p className="text-muted-foreground mb-6">
        Congratulations! Here are the coupons you've earned for being a top
        performer.
      </p>

      {coupons.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12">
           <CardTitle>No Coupons Yet</CardTitle>
           <CardDescription className="mt-2">
             Keep taking the daily quiz and score high to earn rewards!
           </CardDescription>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coupons.map((coupon) => (
            <Card key={coupon.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="font-headline">{coupon.title}</CardTitle>
                    <Ticket className="h-6 w-6 text-accent" />
                </div>
                <CardDescription>{coupon.sponsor}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{coupon.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Valid until: {coupon.validUntil}
                </p>
                <Button asChild>
                  <a href={coupon.link}>Redeem Now</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
