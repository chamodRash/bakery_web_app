const data: Array<{
    id: number;
    title: string;
    category: string;
    price: number;
    image: string;
    desc: string;
    available: string | number;
  }> = [
    {
      id: 1,
      title: 'Chocolate Cake',
      category: 'Cakes',
      price: 200,
      image: '/product/1.jpg',
      desc: 'A rich and moist chocolate cake topped with creamy chocolate ganache.',
      available: "5kg" // 5 cakes available
    },
    {
      id: 2,
      title: 'Vanilla Cake',
      category: 'Cakes',
      price: 180,
      image: '/product/2.jpg',
      desc: 'A classic vanilla cake with buttercream frosting.',
      available: "3kg" // 3 cakes available
    },
    {
      id: 3,
      title: 'Red Velvet Cake',
      category: 'Cakes',
      price: 220,
      image: '/product/3.jpg',
      desc: 'A decadent red velvet cake with cream cheese frosting.',
      available: "0kg" // 0 cakes available
    },
    {
      id: 4,
      title: 'Croissant',
      category: 'Pastries',
      price: 200.5,
      image: '/product/4.jpg',
      desc: 'A flaky and buttery croissant, perfect for breakfast or a snack.',
      available: 20 // 20 croissants available
    },
    {
      id: 5,
      title: 'Apple Turnover',
      category: 'Pastries',
      price: 300,
      image: '/product/5.jpg',
      desc: 'A delicious apple turnover with a flaky crust and sweet apple filling.',
      available: 15 // 15 turnovers available
    },
    {
      id: 6,
      title: 'Danish Pastry',
      category: 'Pastries',
      price: 300.5,
      image: '/product/6.jpg',
      desc: 'A buttery and flaky Danish pastry with a variety of fillings.',
      available: 10 // 10 pastries available
    },
    {
      id: 7,
      title: 'Sourdough Bread',
      category: 'Breads',
      price: 500,
      image: '/product/7.jpg',
      desc: 'A loaf of artisanal sourdough bread with a tangy flavor and a crisp crust.',
      available: 8 // 8 loaves available
    },
    {
      id: 8,
      title: 'Baguette',
      category: 'Breads',
      price: 300,
      image: '/product/8.jpg',
      desc: 'A classic French baguette with a crispy crust and soft interior.',
      available: 12 // 12 baguettes available
    },
    {
      id: 9,
      title: 'Whole Wheat Bread',
      category: 'Breads',
      price: 400,
      image: '/product/9.jpg',
      desc: 'A healthy whole wheat bread made with 100% whole grain flour.',
      available: 0 // 0 loaves available
    },
    {
      id: 10,
      title: 'Chocolate Chip Cookie',
      category: 'Cookies',
      price: 100.5,
      image: '/product/10.jpg',
      desc: 'A classic chocolate chip cookie with a perfect balance of chewiness and crunch.',
      available: 50 // 50 cookies available
    },
    {
      id: 11,
      title: 'Oatmeal Raisin Cookie',
      category: 'Cookies',
      price: 100.5,
      image: '/product/11.jpg',
      desc: 'A chewy oatmeal raisin cookie packed with wholesome oats and juicy raisins.',
      available: 30 // 30 cookies available
    },
    {
      id: 12,
      title: 'Peanut Butter Cookie',
      category: 'Cookies',
      price: 100.5,
      image: '/product/12.jpg',
      desc: 'A soft and chewy peanut butter cookie with a rich peanut flavor.',
      available: 40 // 40 cookies available
    },
    {
      id: 21,
      title: 'Chocolate Cake',
      category: 'Cakes',
      price: 200,
      image: '/product/1.jpg',
      desc: 'A rich and moist chocolate cake topped with creamy chocolate ganache.',
      available: "5kg" // 5 cakes available
    },
    {
      id: 22,
      title: 'Vanilla Cake',
      category: 'Cakes',
      price: 180,
      image: '/product/2.jpg',
      desc: 'A classic vanilla cake with buttercream frosting.',
      available: "3kg" // 3 cakes available
    },
    {
      id: 23,
      title: 'Red Velvet Cake',
      category: 'Cakes',
      price: 220,
      image: '/product/3.jpg',
      desc: 'A decadent red velvet cake with cream cheese frosting.',
      available: "0kg" // 0 cakes available
    },
    {
      id: 24,
      title: 'Croissant',
      category: 'Pastries',
      price: 200.5,
      image: '/product/4.jpg',
      desc: 'A flaky and buttery croissant, perfect for breakfast or a snack.',
      available: 20 // 20 croissants available
    },
    {
      id: 25,
      title: 'Apple Turnover',
      category: 'Pastries',
      price: 300,
      image: '/product/5.jpg',
      desc: 'A delicious apple turnover with a flaky crust and sweet apple filling.',
      available: 15 // 15 turnovers available
    },
    {
      id: 26,
      title: 'Danish Pastry',
      category: 'Pastries',
      price: 300.5,
      image: '/product/6.jpg',
      desc: 'A buttery and flaky Danish pastry with a variety of fillings.',
      available: 10 // 10 pastries available
    },
    {
      id: 27,
      title: 'Sourdough Bread',
      category: 'Breads',
      price: 500,
      image: '/product/7.jpg',
      desc: 'A loaf of artisanal sourdough bread with a tangy flavor and a crisp crust.',
      available: 8 // 8 loaves available
    },
    {
      id: 28,
      title: 'Baguette',
      category: 'Breads',
      price: 300,
      image: '/product/8.jpg',
      desc: 'A classic French baguette with a crispy crust and soft interior.',
      available: 12 // 12 baguettes available
    },
    {
      id: 29,
      title: 'Whole Wheat Bread',
      category: 'Breads',
      price: 400,
      image: '/product/9.jpg',
      desc: 'A healthy whole wheat bread made with 100% whole grain flour.',
      available: 0 // 0 loaves available
    },
    {
      id: 30,
      title: 'Chocolate Chip Cookie',
      category: 'Cookies',
      price: 100.5,
      image: '/product/10.jpg',
      desc: 'A classic chocolate chip cookie with a perfect balance of chewiness and crunch.',
      available: 50 // 50 cookies available
    },
    {
      id: 31,
      title: 'Oatmeal Raisin Cookie',
      category: 'Cookies',
      price: 100.5,
      image: '/product/11.jpg',
      desc: 'A chewy oatmeal raisin cookie packed with wholesome oats and juicy raisins.',
      available: 30 // 30 cookies available
    },
    {
      id: 32,
      title: 'Peanut Butter Cookie',
      category: 'Cookies',
      price: 100.5,
      image: '/product/12.jpg',
      desc: 'A soft and chewy peanut butter cookie with a rich peanut flavor.',
      available: 40 // 40 cookies available
    }
  ];
  
  export default data;
  