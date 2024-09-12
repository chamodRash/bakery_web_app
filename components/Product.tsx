// "use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { HiShoppingCart } from "react-icons/hi";
// import { useState, useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import CategoryModal from "./CategoryModal";
// import { fetchCategories, fetchProducts } from "@/data/product";
// import Link from "next/link";

// interface Category {
//   id: number;
//   img_url: string;
//   name: string;
//   description: string;
//   products: string;
// }

// interface Product {
//   id: number;
//   image: string;
//   name: string;
//   categoryid: number;
//   categoryName?: string;
//   price: string;
//   description: string;
//   category: string;
//   qty: number;
// }

// export default function Product() {
//   const [categoryItem, setCategoryItem] = useState<Category[]>([]);
//   const [productItem, setProductItem] = useState<Product[]>([]);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [categoryModalOpen, setCategoryModalOpen] = useState(false);
//   const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     const fetchAndSetCategories = async () => {
//       const categories = await fetchCategories();
//       setCategoryItem(categories as Category[]);
//     };

//     fetchAndSetCategories();
//   }, []);

//   useEffect(() => {
//     const fetchAndSetProducts = async () => {
//       if (categoryItem.length > 0) {
//         const products = await fetchProducts(categoryItem);
//         setProductItem(products as Product[]);
//       }
//     };

//     fetchAndSetProducts();
//   }, [categoryItem]);

//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const productId = queryParams.get("productId");
//     const categoryId = queryParams.get("categoryId");

//     if (productId) {
//       const product = productItem.find((p) => p.id === parseInt(productId));
//       if (product) {
//         setSelectedProduct(product);
//         setCategoryModalOpen(false);
//         window.scrollTo({ top: 0, behavior: "auto" });
//       }
//     }

//     if (categoryId) {
//       const filteredProducts = productItem.filter(
//         (product) => product.categoryName === categoryId
//       );
//       setSelectedCategory(categoryId);
//       setCategoryProducts(filteredProducts);
//       setCategoryModalOpen(true);
//     }
//   }, [productItem]);

//   const handleProductClick = (product: Product) => {
//     setSelectedProduct(product);
//     setCategoryModalOpen(false);
//     window.scrollTo({ top: 0, behavior: "auto" });

//     // Update the URL with the product ID and remove the URL with the categoryId
//     const queryParams = new URLSearchParams(window.location.search);
//     queryParams.set('productId', product.id.toString());
//     queryParams.delete('categoryId');
//     window.history.pushState({}, '', `${window.location.pathname}?${queryParams}`);

//   };

//   const handleCategoryClick = (category: Category) => {
//     const filteredProducts = productItem.filter(
//       (product) => product.categoryid === category.id
//     );
//     setSelectedCategory(category.name);
//     setCategoryProducts(filteredProducts);
//     setCategoryModalOpen(true);

//     // Update the URL with the selected category and remove the URL with the productId
//     const queryParams = new URLSearchParams(window.location.search);
//     queryParams.set('categoryId', category.id.toString());
//     queryParams.delete('productId');
//     window.history.pushState({}, '', `${window.location.pathname}?${queryParams}`);

//   };

//   const handleCloseCategoryModal = () => {
//     setCategoryModalOpen(false);

//     //remove the URL with the categoryId
//     const queryParams = new URLSearchParams(window.location.search);
//     queryParams.delete('categoryId');
//     window.history.pushState({}, '', `${window.location.pathname}?${queryParams}`);
//   };

//   const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuantity(parseInt(e.target.value));
//   };

//   const SampleNextArrow = (props: any) => {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "#5E3719" }}
//         onClick={onClick}
//       />
//     );
//   };

//   const SamplePrevArrow = (props: any) => {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "#5E3719" }}
//         onClick={onClick}
//       />
//     );
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     pauseOnHover: true,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 4 } },
//       { breakpoint: 768, settings: { slidesToShow: 3 } },
//       { breakpoint: 600, settings: { slidesToShow: 2 } },
//       { breakpoint: 480, settings: { slidesToShow: 1 } },
//     ],
//   };

//   return (
//     <div className="p-4 md:p-8 items-center justify-center">
//       <section id="#section1" className="grid gap-10 md:grid-cols-2 items-center justify-center">
//         {selectedProduct && (
//           <>
//             <div className="m-4">
//               <Image
//                 src={selectedProduct.image}
//                 alt={selectedProduct.name}
//                 width={700}
//                 height={500}
//                 priority={true}
//                 className="w-[700px] h-[500px] rounded-3xl shadow-lg shadow-[#5E3719]"
//               />
//             </div>
//             <div className="mr-5 ml-5">
//               <h1 className="text-3xl md:text-5xl text-[#5E3719] font-bold">
//                 {selectedProduct.name}
//               </h1>
//               <p className="font-bold ml-1 mb-4 text-xl">{selectedProduct.categoryName}</p>
//               <p className="mb-4 ml-1">{selectedProduct.description}</p>
//               <p className="mb-4 ml-1 font-bold  text-xs">Available Qty: {selectedProduct.qty}</p>
//               <div className="mt-5 flex items-center justify-between">
//                 <div>
//                   <label htmlFor={`quantity-${selectedProduct.id}`} className="font-bold">
//                     Qty:{" "}
//                   </label>
//                   <input
//                     type="number"
//                     id="quantity"
//                     name="quantity"
//                     min="1"
//                     defaultValue="1"
//                     onChange={handleQuantityChange}
//                     className=" ml-1 w-16 mr-4 border-2 border-[#5E3719]"
//                     title="Quantity"
//                   />
//                 </div>
//                 <p className="font-bold text-xl mr-4">Rs. {selectedProduct.price}/=</p>
//               </div>
//               <div className="mt-5 flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-2">
//                 <Link href={`/buy/${selectedProduct.id}?qty=${quantity}`} className="w-full md:w-1/2">
//                   <Button className="bg-[#5E3719] text-white rounded-full w-full ">
//                     Buy Now
//                   </Button>
//                 </Link>
//                 <Link href={`/userCart/${selectedProduct.id}?qty=${quantity}`} className="w-full md:w-1/2">
//                   <Button className="bg-[hsl(5,12%,83%)] text-[#5E3719] hover:text-white rounded-full w-full">
//                     Add to Cart
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </>
//         )}
//       </section>

//       <section id="#section2" className="mt-4 p-4">
//         <h2 className="text-3xl mb-4 text-center text-[#5E3719] font-bold">Categories</h2>
//         <div className="w-auto">
//           <Slider {...settings}>
//             {categoryItem.map((category) => (
//               <div
//                 key={category.id}
//                 className="hover:bg-[hsl(5,12%,83%)] p-4 text-center cursor-pointer rounded-3xl"
//                 onClick={() => handleCategoryClick(category)}
//               >
//                 <div className="m-2">
//                   <img
//                     src={category.img_url}
//                     alt={category.name}
//                     width={200}
//                     height={200}
//                     className="w-[200px] h-[200px] object-cover rounded-full shadow-[#5E3719] shadow-lg"
//                   />
//                   <p className="mt-2 font-bold text-2xl hover:text-[#5E3719]">{category.name}</p>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </section>

//       <section id="#section3" className="mt-4 p-4">
//         <h2 className="text-3xl mb-8 text-center text-[#5E3719] font-bold">More to Explore</h2>
//         <div className="flex flex-wrap justify-center gap-8">
//           {productItem.map((product) => (
//             <div
//               key={product.id}
//               className="text-center rounded-3xl bg-[hsl(5,12%,83%)] shadow-lg shadow-[#5E3719] max-w-xs"
//             >
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 width={400}
//                 height={400}
//                 priority={true}
//                 className="w-[400px] h-[300px] object-cover  rounded-3xl cursor-pointer"
//                 onClick={() => handleProductClick(product)}
//               />
//               <div className="pr-4 pl-4">
//                 <div className="mt-2 font-bold flex justify-between cursor-pointer">
//                   <p
//                     className="hover:text-[#5E3719]"
//                     onClick={() => handleProductClick(product)}
//                   >
//                     {product.name}
//                   </p>
//                   <p>Rs. {product.price}/=</p>
//                 </div>
//                 <p className="mb-2 text-left font-light">{product.categoryName}</p>
//               </div>
//               <div className="pr-4 pl-4 mb-5 flex justify-between">
//                 <Link href={`/buy/${product.id}`} className="flex w-5/6" >
//                   <Button className="rounded-full w-5/6">Buy Now</Button>
//                 </Link>
//                 <Link href={`/userCart/${product.id}`}>
//                   <Button
//                     variant={"ghost"}
//                     size={"icon"}
//                     className={
//                       "text-[#5E3719] hover:bg-white hover:text-[#5E3719] text-2xl rounded-full"
//                     }
//                   >
//                     <HiShoppingCart />
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//       <CategoryModal
//         isOpen={categoryModalOpen}
//         onClose={handleCloseCategoryModal}
//         categoryProducts={categoryProducts}
//         handleProductClick={handleProductClick}
//         category={selectedCategory}
//       />
//     </div>
//   );
// }
