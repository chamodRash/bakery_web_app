import { useState } from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReviewDialogProps {
  productName: string;
  children: React.ReactNode;
}

export function ReviewDialog({ productName, children }: ReviewDialogProps) {
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a Review for {productName}</DialogTitle>
          <DialogDescription>
            Share your thoughts about this product. Your feedback helps us
            improve!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                className={`w-8 h-8 cursor-pointer ${
                  value <= stars
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
                onClick={() => setStars(value)}
              />
            ))}
          </div>
          <Textarea
            placeholder="Write your review here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button
            // onClick={handleSubmit}
            disabled={stars === 0}>
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
