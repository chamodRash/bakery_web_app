import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-secondary text-primary-foreground text-zinc-900 mt-10 overflow-x-hidden">
      <div className="container mx-auto px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid grid-rows-2 justify-center">
            <div className="flex items-center gap-x-5">
              <Image src={"/logo.png"} width={100} height={100} alt={"logo"} />
              <div>
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <p className="text-sm">
                  We&#39;re passionate about baking the finest breads and
                  pastries using traditional methods and the best ingredients.
                </p>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="text-lg font-semibold mb-2">Subscribe</h3>
              <p className="text-sm mb-2">
                Stay updated with our latest offers and products.
              </p>
              <form className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="mr-2 bg-transparent border-primary text-primary font-semibold"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="pl-10">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="text-sm hover:underline">
                    Our Products
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className="text-sm hover:underline">
                    Locations
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 space-y-2">
                Contact Us
              </h3>
              <p className="text-sm">123 Bakery Street</p>
              <p className="text-sm">Cityville, State 12345</p>
              <p className="text-sm">Phone: (123) 456-7890</p>
              <p className="text-sm">Email: info@bakery.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 py-1 border-t border-primary text-center bg-primary text-white">
        <p className="text-sm">&copy; 2023 Our Bakery. All rights reserved.</p>
      </div>
    </footer>
  );
}
