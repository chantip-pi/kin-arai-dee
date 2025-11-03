import { FlexBubble } from '@line/bot-sdk';

export type Food = {
	name: string;
	imageUrl: string;
};

export const foods: Food[] = [
	{
		name: 'ข้าวผัดหมู',
		imageUrl: 'https://s359.kapook.com/pagebuilder/3dfc9eae-e6b7-484a-9cbc-280067076ce4.jpg',
	},
	{
		name: 'ข้าวขาหมู',
		imageUrl: 'https://img-global.cpcdn.com/recipes/san9n06rrmbygemguo0x/1200x630cq70/photo.jpg',
	},
	{
		name: 'ข้าวหมูแดง',
		imageUrl: 'https://www.ryoiireview.com/upload/article/202212/1671519383_b1ac48e84be408c36be2df47420f3d05.jpg',
	},
	{
		name: 'ข้าวหน้าเป็ด',
		imageUrl: 'https://images.aws.nestle.recipes/resized/e4b2d29ca6efb9f89b3062d9fb6da7fd_maggi_2_4877_944_531.jpg',
	},
	{
		name: 'หมูผัดกระเทียมพริกไทย',
		imageUrl: 'https://images.aws.nestle.recipes/resized/3c7934693ebae7a1d4ed42e8498da3d7_7o5a6087_1500_700.jpg',
	},
	{
		name: 'ผัดไทยกุ้งสด',
		imageUrl: 'https://c.pxhere.com/photos/1b/ec/shrimp_cuisine_thailand_meal_asian_seafood_spicy_traditional-894841.jpg!d',
	},
	{
		name: 'ต้มยำกุ้ง',
		imageUrl: 'https://source.roboflow.com/wmIq8o8LaGhBCejz7RUF9hfJWz22/NUp1tkZqOHRRhLOWU4U1/original.jpg',
	},
	{
		name: 'แกงเขียวหวานไก่',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Khanom_chin_kaeng_kiao_wan_kai.jpg',
	},
	{
		name: 'ข้าวมันไก่',
		imageUrl: 'https://source.roboflow.com/BgR6eh3EyHNZdvQJPMuaZNUCOV03/FZiWMyABzeZKcyf9Mub7/original.jpg',
	},
	{
		name: 'กะเพราไก่ไข่ดาว',
		imageUrl: 'https://source.roboflow.com/nWo8BpxrBBVDYKzaqAkVK2HmsPU2/Con0KFKuZXEQgyqcPbms/original.jpg',
	},
	{
		name: 'ส้มตำไทย',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/%E0%B8%95%E0%B8%B3%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B9%84%E0%B8%82%E0%B9%88%E0%B9%80%E0%B8%84%E0%B9%87%E0%B8%A1_%E0%B8%AA%E0%B9%89%E0%B8%A1%E0%B8%95%E0%B8%B3_%E0%B8%95%E0%B8%B3%E0%B8%96%E0%B8%B2%E0%B8%94_Tumtaad_%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%B5%E0%B9%88_01.jpg',
	},
	{
		name: 'ก๋วยเตี๋ยวเรือ',
		imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQk625PeXLOAdhTVPdgkMVEO2Tgpv4xqrU6w&s',
	},
	{
		name: 'ข้าวซอยไก่',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Northern_Thailand_style_curry_noodle_-_%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%8B%E0%B8%AD%E0%B8%A2_%285725991023%29.jpg',
	},
	{
		name: 'ผัดซีอิ๊วหมู',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Sriwan_KuayTiow.JPG',
	},
	{
		name: 'สุกี้น้ำ',
		imageUrl: 'https://www.industry.in.th/uploadedimages/c1/Product_47949_897733191_fullsize.jpg',
	},
	{
		name: 'ยำวุ้นเส้น',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Yam_wunsen.jpg',
	},
	{
		name: 'หมูทอดกระเทียม',
		imageUrl: 'https://source.roboflow.com/nWo8BpxrBBVDYKzaqAkVK2HmsPU2/3FN1GA6kdl4dSA2hgxwK/original.jpg',
	},
];

export const createFoodFlexMessage = (food: Food): FlexBubble => {
	return {
		type: 'bubble',
        size: 'kilo',
		direction: 'ltr',
		body: {
			type: 'box',
			layout: 'vertical',
			contents: [
				{
					type: 'image',
					url: food.imageUrl,
					aspectRatio: '1:1',
					aspectMode: 'cover',
                    size: 'full',
				},
				{
					type: 'box',
					layout: 'vertical',
					contents: [
						{
							type: 'text',
							text: 'เมนูที่ได้คือ',
                            size: 'sm',
						},
						{
							type: 'text',
							text: food.name,
                            size: 'md',
							weight: 'bold',
                            margin: 'sm',
						},
						{
							type: 'button',
							action: {
								type: 'message',
								text: 'กินอะไรดี',
								label: 'สุ่มอีกครั้ง',
							},
                            margin: 'md',
							style: 'primary',
						},
					],
                    paddingStart: 'md',
                    paddingEnd: 'md',
                    paddingTop: 'md',
                    paddingBottom: 'md',
				},
			],
            paddingAll: 'sm',
		},
	};
};

export const getRandomFood = (): Food => {
	const randomIndex = Math.floor(Math.random() * foods.length);
	return foods[randomIndex];
};

// Returns a Google Maps link to restaurants near a randomized point close to the given coordinates
export const getRandomNearbyRestaurantLink = (latitude: number, longitude: number): string => {
	// ~0.009 degrees ~ 1km at equator; scale by cos(lat) for longitude
	const kmRadius = 1; // approx radius to jitter within
	const degPerKmLat = 1 / 111; // ~111km per 1 degree latitude
	const degPerKmLng = 1 / (111 * Math.cos((latitude * Math.PI) / 180) || 1);

	const jitter = () => (Math.random() * 2 - 1); // -1 to 1
	const latOffset = jitter() * kmRadius * degPerKmLat;
	const lngOffset = jitter() * kmRadius * degPerKmLng;

	const lat = latitude + latOffset;
	const lng = longitude + lngOffset;

	// Use Google Maps search centered at randomized coords
	// Example: https://www.google.com/maps/search/restaurant/@lat,lng,16z
	const zoom = 16;
	return `https://www.google.com/maps/search/restaurant/@${lat},${lng},${zoom}z`;
};