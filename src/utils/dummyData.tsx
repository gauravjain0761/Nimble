import {Icons} from '../assets';

export const products = [
  {
    id: 1,
    product: 'Bakery',
    storeID: 1,
    productImages: [
      {
        id: 1,
        image: Icons.bakery_p_1.p1,
        name: "Dempster's Original Tortilla 10 Inches",
        price: '4.00',
        storeID: 1,
        barcode: '123456789012',
      },
      {
        id: 2,
        image: Icons.bakery_p_1.p2,
        name: "Dempster's Everything Bagel 450g",
        price: '6.98',
        storeID: 1,
        barcode: '123456789013',
      },
      {
        id: 3,
        image: Icons.bakery_p_1.p3,
        name: "Dempster's Original Hotdog Buns (8s)",
        price: '4.49',
        storeID: 1,
        barcode: '123456789014',
      },
      {
        id: 4,
        image: Icons.bakery_p_1.p4,
        name: "Dempster's Whole Grains 12 Grain Bread 600g",
        price: '6.00',
        storeID: 1,
        barcode: '123456789015',
      },
      {
        id: 5,
        image: Icons.bakery_p_1.p5,
        name: "Dempster's White Sliced Bread 675g",
        price: '3.50',
        storeID: 1,
        barcode: '123456789016',
      },
    ],
  },
  {
    id: 2,
    product: 'Chocolates',
    storeID: 2,
    productImages: [
      {
        id: 1,
        image: Icons.chocolate_p_2.p1,
        name: 'Kinder Bueno Chocolate and Hazelnut Cream Wafer Bar',
        price: '2.50',
        storeID: 2,
        barcode: '123456789017',
      },
      {
        id: 2,
        image: Icons.chocolate_p_2.p2,
        name: 'KitKat 45g Chocolate Wafer Bar',
        price: '2.00',
        storeID: 2,
        barcode: '123456789018',
      },
      {
        id: 3,
        image: Icons.chocolate_p_2.p3,
        name: 'M&Ms Peanut Butter Milk Chocolate Candy Bar',
        price: '2.00',
        storeID: 2,
        barcode: '123456789019',
      },
      {
        id: 4,
        image: Icons.chocolate_p_2.p4,
        name: 'Mars 52g Chocolate Caramel Candy Bar',
        price: '2.00',
        storeID: 2,
        barcode: '123456789020',
      },
      {
        id: 5,
        image: Icons.chocolate_p_2.p5,
        name: "Reese's Peanut Butter Cups 46g Nutty Cream Chocolate Bar",
        price: '2.29',
        storeID: 2,
        barcode: '123456789021',
      },
      {
        id: 6,
        image: Icons.chocolate_p_2.p6,
        name: "Reese's Peanut Butter Cups 46g Nutty Cream Chocolate Bar",
        price: '2.29',
        storeID: 2,
        barcode: '123456789022',
      },
      {
        id: 7,
        image: Icons.chocolate_p_2.p7,
        name: "Reese's Sticks Peanut Butter Chocolate Candy Bar",
        price: '2.00',
        storeID: 2,
        barcode: '123456789023',
      },
      {
        id: 8,
        image: Icons.chocolate_p_2.p8,
        name: 'Snickers Pecan Chewy Nutty Caramel Nougat Milk Chocolate Bar',
        price: '2.00',
        storeID: 2,
        barcode: '123456789024',
      },
      {
        id: 9,
        image: Icons.chocolate_p_2.p9,
        name: 'Toblerone White 100g Chocolate Bar',
        price: '4.00',
        storeID: 2,
        barcode: '123456789025',
      },
    ],
  },
  {
    id: 3,
    product: 'Dairy',
    storeID: 3,
    productImages: [
      {
        id: 1,
        image: Icons.diary_p_3.p1,
        name: 'Astro Original Plain Yogurt 750g',
        price: '5.00',
        storeID: 3,
        barcode: '1234567890265',
        tags: ['Astro', 'Astro Original Plain Yogurt', 'Plain Yogurt'],
      },
      {
        id: 2,
        image: Icons.diary_p_3.p2,
        name: 'Dempster’s Gold Hamburger Buns (8-pack)',
        price: '4.00',
        storeID: 3,
        barcode: '1234567890272',
        tags: ['Dempster’s', 'Gold Hamburger Buns (8-pack)', ' Hamburger Buns'],
      },
      {
        id: 3,
        image: Icons.diary_p_3.p3,
        name: 'Extra Large Eggs (18-pack)',
        price: '8.00',
        storeID: 3,
        tags: ['Extra Large Eggs', ' Large Eggs', '(18-pack)'],
        barcode: '1234567890289',
      },
      {
        id: 4,
        image: Icons.diary_p_3.p4,
        name: 'Gay Lea Salted Butter 250g',
        price: '5.00',
        storeID: 3,
        barcode: '1234567890296',
        tags: ['Gay Lea Salted Butter 250g', 'Gay Lea', ' Salted Butter'],
      },
      {
        id: 5,
        image: Icons.diary_p_3.p5,
        name: 'Gay Lea Unsalted Butter 250g',
        price: '5.00',
        storeID: 3,
        tags: ['Gay Lea Salted Butter 250g', 'Gay Lea', ' Salted Butter'],
        barcode: '1234567890302',
      },

      {
        id: 6,
        image: Icons.parle_g,
        name: 'Parle G Gold',
        price: '5.00',
        storeID: 3,
        tags: ['Parle-G Gold', 'Gold', ' G', 'Parle', 'biscuits'],
        barcode: '987654321098',
      },
    ],
  },
  {
    id: 4,
    product: 'Drinks',
    storeID: 4,
    productImages: [
      {
        id: 1,
        image: Icons.drinks_p_4.p1,
        name: '7Up Zero Sugar 355ml',
        price: '1.79',
        storeID: 4,
        barcode: '123456789031',
      },
      {
        id: 2,
        image: Icons.drinks_p_4.p2,
        name: 'Canada Dry Ginger Ale 355ml',
        price: '1.79',
        storeID: 4,
        barcode: '123456789032',
      },
      {
        id: 3,
        image: Icons.drinks_p_4.p3,
        name: 'Coca-Cola 355ml Can',
        price: '1.99',
        storeID: 4,
        barcode: '123456789033',
      },
      {
        id: 4,
        image: Icons.drinks_p_4.p4,
        name: 'Coca-Cola Zero Sugar 355ml',
        price: '1.99',
        storeID: 4,
        barcode: '123456789034',
      },
      {
        id: 5,
        image: Icons.drinks_p_4.p5,
        name: 'Doogh Abali Can 320 ML - Super Unique Store',
        price: '2.50',
        storeID: 4,
        barcode: '123456789035',
      },
      {
        id: 6,
        image: Icons.drinks_p_4.p6,
        name: 'Fanta Orange 355ml Citrus Soda Pop Can',
        price: '1.79',
        storeID: 4,
        barcode: '123456789036',
      },
      {
        id: 7,
        image: Icons.drinks_p_4.p7,
        name: 'Mountain Dew Zero Sugar 355ml Soda',
        price: '1.89',
        storeID: 4,
        barcode: '123456789037',
      },
      {
        id: 8,
        image: Icons.drinks_p_4.p8,
        name: 'Nestea Raspberry 355ml Ice Tea Beverage',
        price: '1.89',
        storeID: 4,
        barcode: '123456789038',
      },
      {
        id: 9,
        image: Icons.drinks_p_4.p9,
        name: 'Nestea Zero Sugar 355ml Iced Tea Beverage',
        price: '1.89',
        storeID: 4,
        barcode: '123456789039',
      },
      {
        id: 10,
        image: Icons.drinks_p_4.p10,
        name: 'Rani Orange - Super Unique Store',
        price: '2.49',
        storeID: 4,
        barcode: '123456789040',
      },
      {
        id: 11,
        image: Icons.drinks_p_4.p11,
        name: 'Rani Pineapple - Super Unique Store',
        price: '2.49',
        storeID: 4,
        barcode: '123456789041',
      },
      {
        id: 12,
        image: Icons.drinks_p_4.p12,
        name: 'Red Bull 250ml - Joy Convenience',
        price: '2.99',
        storeID: 4,
        barcode: '123456789042',
      },
    ],
  },
  {
    id: 5,
    product: 'Chips',
    storeID: 5,
    productImages: [
      {
        id: 1,
        image: Icons.chips_p_5.p1,
        name: 'Doritos Bold Bbq Chips (235 g)',
        price: '4.50',
        storeID: 5,
        barcode: '123456789043',
      },
      {
        id: 2,
        image: Icons.chips_p_5.p2,
        name: 'Doritos Chips (cool ranch)',
        price: '4.50',
        storeID: 5,
        barcode: '123456789044',
      },
      {
        id: 3,
        image: Icons.chips_p_5.p3,
        name: 'Doritos Spicy Nacho Chips (235 g)',
        price: '4.50',
        storeID: 5,
        barcode: '123456789045',
      },
      {
        id: 4,
        image: Icons.chips_p_5.p4,
        name: "Lay's Classic Potato Chips (235 g)",
        price: '4.00',
        storeID: 5,
        barcode: '123456789046',
      },
      {
        id: 5,
        image: Icons.chips_p_5.p5,
        name: "Lay's Ketchup Potato Chips (235 g)",
        price: '4.00',
        storeID: 5,
        barcode: '123456789047',
      },
      {
        id: 6,
        image: Icons.chips_p_5.p6,
        name: "Lay's Magic Masala Potato Chips (165 g)",
        price: '3.50',
        storeID: 5,
        barcode: '123456789048',
      },
      {
        id: 7,
        image: Icons.chips_p_5.p7,
        name: "Lay's Salt & Vinegar Potato Chips (255 g)",
        price: '4.00',
        storeID: 5,
        barcode: '123456789049',
      },
    ],
  },
  {
    id: 6,
    product: 'PantryFood',
    storeID: 6,
    productImages: [
      {
        id: 1,
        image: Icons.pantry_p_6.p1,
        name: 'Sadaf Angelica (Golpar)  Ground - 2 oz',
        price: '4.99',
        storeID: 6,
        barcode: '123456789050',
      },
      {
        id: 2,
        image: Icons.pantry_p_6.p2,
        name: 'Sadaf Dried Lime (Limoo Omani)  Ground - 4 oz',
        price: '4.99',
        storeID: 6,
        barcode: '123456789051',
      },
      {
        id: 3,
        image: Icons.pantry_p_6.p3,
        name: 'Sadaf Green Cardamom  Whole 0.75 oz',
        price: '4.99',
        storeID: 6,
        barcode: '123456789052',
      },
      {
        id: 4,
        image: Icons.pantry_p_6.p4,
        name: 'Sadaf Ground Sumac - 4oz',
        price: '2.99',
        storeID: 6,
        barcode: '123456789053',
      },
      {
        id: 5,
        image: Icons.pantry_p_6.p5,
        name: 'Sadaf Shish Kabob Seasoning - 2.5 oz',
        price: '6.99',
        storeID: 6,
        barcode: '123456789054',
      },
      {
        id: 6,
        image: Icons.pantry_p_6.p6,
        name: 'Sadaf Tikka Masala Seasoning - 4 oz',
        price: '6.99',
        storeID: 6,
        barcode: '123456789055',
      },
    ],
  },
  {
    id: 7,
    product: 'Gum_Mint',
    storeID: 7,
    productImages: [
      {
        id: 1,
        image: Icons.gum_p_7.p1,
        name: '5 Gum Peppermint 15pc',
        price: '2.99',
        storeID: 7,
        barcode: '123456789056',
      },
      {
        id: 2,
        image: Icons.gum_p_7.p2,
        name: '5 Gum Spearmint Rain 15 Pc',
        price: '2.99',
        storeID: 7,
        barcode: '123456789057',
      },
      {
        id: 3,
        image: Icons.gum_p_7.p3,
        name: '5 Gum Sweetmint 15 Pc',
        price: '2.99',
        storeID: 7,
        barcode: '123456789058',
      },
      {
        id: 4,
        image: Icons.gum_p_7.p4,
        name: 'Doublemint Gums 15 Sticks',
        price: '2.00',
        storeID: 7,
        barcode: '123456789059',
      },
      {
        id: 5,
        image: Icons.gum_p_7.p5,
        name: 'Excel Peppermint Flavoured Sugar Free Chewing Gum',
        price: '2.50',
        storeID: 7,
        barcode: '123456789060',
      },
      {
        id: 6,
        image: Icons.gum_p_7.p6,
        name: 'Excel Sugar Free Winterfresh Chewing Gum Single Pack',
        price: '2.50',
        storeID: 7,
        barcode: '123456789061',
      },
      {
        id: 7,
        image: Icons.gum_p_7.p7,
        name: 'Halls Relief Cherry',
        price: '1.50',
        storeID: 7,
        barcode: '123456789062',
      },
      {
        id: 8,
        image: Icons.gum_p_7.p8,
        name: 'Juicy Fruit 15 Sticks',
        price: '2.00',
        storeID: 7,
        barcode: '123456789063',
      },
      {
        id: 9,
        image: Icons.gum_p_7.p9,
        name: 'Mentos Freshmint Pure Fresh Gum',
        price: '5.00',
        storeID: 7,
        barcode: '123456789064',
      },
      {
        id: 10,
        image: Icons.gum_p_7.p10,
        name: 'Mentos Spearmint Pure Fresh Gum',
        price: '4.50',
        storeID: 7,
        barcode: '123456789065',
      },
      {
        id: 11,
        image: Icons.gum_p_7.p11,
        name: 'Mentos Van Melle Peppermint Chewy Mints',
        price: '2.00',
        storeID: 7,
        barcode: '123456789066',
      },
      {
        id: 12,
        image: Icons.gum_p_7.p12,
        name: 'Tick Tac Fresh Mint 29 g',
        price: '1.50',
        storeID: 7,
        barcode: '123456789067',
      },
      {
        id: 13,
        image: Icons.gum_p_7.p13,
        name: 'Trident Spearmint 14 pc',
        price: '2.00',
        storeID: 7,
        barcode: '123456789068',
      },
    ],
  },
];

export const storeData = [
  {
    id: 1,
    name: 'Bayview Jug Milk',
    image: Icons.store_1,
    address: '123 Main St, City, State, Zip',
    distance: '0.2 miles away',
    products: products[0].productImages,
    type: 'Bakery',
    productType: {
      Bakery: true,
      Chips: false,
      Dairy: false,
      Chocolates: true,
      PantryFood: false,
      Gum_Mint: true,
      Drinks: false,
    },
  },
  {
    id: 2,
    name: 'Joy Convenience',
    image: Icons.store_2,
    address: '456 Elm St, City, State, Zip',
    distance: '3 miles away',
    products: products[1].productImages,
    type: 'Chocolates',
    productType: {
      Bakery: false,
      Chips: true,
      Dairy: true,
      Chocolates: true,
      PantryFood: false,
      Gum_Mint: true,
      Drinks: true,
    },
  },
  {
    id: 3,
    name: 'Starbank Convenience',
    image: Icons.store_3,
    address: '456 Elm St, City, State, Zip',
    distance: '7 miles away',
    products: products[2].productImages,
    type: 'Diary',
    productType: {
      Bakery: true,
      Chips: true,
      Dairy: true,
      Chocolates: true,
      PantryFood: false,
      Gum_Mint: true,
      Drinks: true,
    },
  },
  {
    id: 4,
    name: 'Super Unique',
    image: Icons.store_4,
    address: '456 Elm St, City, State, Zip',
    distance: '4 miles away',
    products: products[3].productImages,
    type: 'Drinks',
    productType: {
      Bakery: false,
      Chips: true,
      Dairy: false,
      Chocolates: false,
      PantryFood: true,
      Gum_Mint: true,
      Drinks: true,
    },
  },
];

export const categories = [
  {
    id: 1,
    title: 'Bread & Bakery Goods ',
    storeID: 1,
    productType: 'Bakery',
  },
  {
    id: 2,
    title: 'Drinks',
    storeID: 4,
    productType: 'Drinks',
  },
  {
    id: 3,
    title: 'Dairy and Bakery',
    storeID: 3,
    productType: 'Dairy',
  },
  {
    id: 4,
    title: 'Chocolate Bars',
    storeID: 2,
    productType: 'Chocolates',
  },
  {
    id: 5,
    title: 'Pantry Food',
    storeID: 6,
    productType: 'PantryFood',
  },
  {
    id: 6,
    title: 'Gum & Mint',
    storeID: 7,
    productType: 'Gum_Mint',
  },
  {
    id: 7,
    title: 'Chips',
    storeID: 5,
    productType: 'Chips',
  },
];

export const onboardingData = [
  {
    id: 1,
    image: Icons?.onboarding1,
    content:
      'Avoid the queue and optimize your time by ordering through the app and schedule a pickup.',
    title: 'Skip the Queue',
  },
  {
    id: 2,
    image: Icons?.onboarding2,
    content:
      'Enjoy fast, in-store convenience or curbside pickup—all while skipping checkout lines. Shop with freedom and ease.',
    title: 'Effortless Shopping, Your Way',
  },
  {
    id: 3,
    image: Icons?.onboarding3,
    content: 'Unlock exclusive offers and discounts on your favorite items.',
    title: 'Save More Every Day',
  },
];

export const carouselBanner = [
  {
    id: 1,
    image: Icons.offer_1,
  },
  {
    id: 2,
    image: Icons.offer_2,
  },
  {
    id: 3,
    image: Icons.offer_3,
  },
  {
    id: 3,
    image: Icons.offer_4,
  },
];

export const dropDownData = [
  {
    label: '11216',
    value: '11216',
  },
  {
    label: '11213',
    value: '11213',
  },
  {
    label: '11212',
    value: '11212',
  },
];

export const dropDownData1 = [
  {
    label: 'Pick up today',
    value: 'Pick up today',
  },
  {
    label: 'Pick up today',
    value: 'Pick up today',
  },
];
export const dropDownDataDay = [
  {
    label: 'Today',
    value: 'Today',
  },
  {
    label: 'Tomorrow',
    value: 'Tomorrow',
  },
  {
    label: 'Day after tomorrow',
    value: 'Day after tomorrow',
  },
];

export const dropDownData2 = [
  {
    label: '9:00 am',
    value: '9:00 am',
  },
  {
    label: '2:00 pm',
    value: '2:00 pm',
  },
  {
    label: '3:00 pm',
    value: '3:00 pm',
  },
  {
    label: '4:00 pm',
    value: '4:00 pm',
  },
  {
    label: '5:00 pm',
    value: '5:00 pm',
  },
  {
    label: '6:00 pm',
    value: '6:00 pm',
  },
  {
    label: '7:00 pm',
    value: '7:00 pm',
  },
];

export const storeProduct = [
  {
    id: 1,
    name: 'Organic Fresh Gala Apples 2 Ibs bag',
    image: Icons.image,
    price: 5.99,
  },
  {
    id: 2,
    name: 'Skippy Peanut Butter Crunch 16 oz jar',
    image: Icons.image2,
    price: 3.99,
  },
  {
    id: 3,
    name: 'Sparta Olive Oil 16oz bottle',
    image: Icons.image4,
    price: 12.99,
  },
];

export const AddTip = [
  {
    id: 1,
    title: '1.00',
  },
  {
    id: 2,
    title: '2.00',
  },
  {
    id: 3,
    title: '3.00',
  },
  {
    id: 4,
    title: '10.00',
  },

  // {
  //   id: 3,
  //   title: '🧸️ Custom tip',
  // },
];

export const storeDataList = [
  {
    id: 1,
    name: 'Bayview Jug Milk',
    image: Icons.store_1,
  },
  {
    id: 2,
    name: 'Joy Convenience',
    image: Icons.store_2,
  },
  {
    id: 3,
    name: 'Starbank Convenience',
    image: Icons.store_3,
  },
  {
    id: 4,
    name: 'Super Unique',
    image: Icons.store_4,
  },
];

export const addressList = [
  {
    id: '1',
    label: 'ON M5G 1Z4',
    value: '84 Gerrard St W, Toronto, ON M5G 1Z4',
  },
  {
    id: '2',
    label: 'ON M4S 1P8',
    value: '48 Manor Rd E, Toronto, ON M4S 1P8',
  },
  {
    id: '3',
    label: 'ON M4M 2G5',
    value: '188 Broadview Ave, Toronto, ON M4M 2G5',
  },
  {
    id: '4',
    label: 'ON M4S 1E8',
    value: '180 Davisville Ave, Toronto, ON M4S 1E8',
  },
];

export const helpList = [
  {
    id: 1,
    title: 'View FAQs',
    dec: 'Find quick questions to common questions.',
    image: Icons.faq,
  },
  {
    id: 2,
    title: 'Contact Support',
    dec: 'Reach out to ud directly for technical support.',
    image: Icons.contact,
  },
  {
    id: 3,
    title: 'Contact In-Store Employee',
    dec: 'Connect with a person at the store for immediate assistance.',
    image: Icons.employee,
  },
];
