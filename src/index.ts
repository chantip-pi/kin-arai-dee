import type { Message, WebhookRequestBody } from '@line/bot-sdk';
import { createFoodFlexMessage, getRandomFood, getRandomNearbyRestaurantLink } from './utils';
import { reply } from './line';

export interface Env {
	LINE_MESSAGING_ACCESS_TOKEN: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const { method } = request;

		if (method !== 'POST') {
			return Response.json({ message: 'Method not allowed' }, { status: 405 });
		}
		const body = await request.json<WebhookRequestBody>();

		for (const event of body.events) {
			if (event.type !== 'message') continue;

			const replyToken = event.replyToken;
			if (!replyToken) continue;

			let messages: Message[] | null = null;

			if (event.message.type === 'location') {
				const anyMsg: any = event.message as any;
				const lat = anyMsg.latitude as number;
				const lng = anyMsg.longitude as number;
				const url = getRandomNearbyRestaurantLink(lat, lng);
				messages = [{ type: 'text', text: `ที่ตั้งร้านอาหารใกล้คุณ: ${url}` }];
			} else if (event.message.type === 'text') {
				const randomFood = getRandomFood();
				messages = [
					{
						type: 'flex',
						altText: `เมนูที่ได้คือ${randomFood.name}`,
						contents: createFoodFlexMessage(randomFood),
					},
				];
			}

			if (!messages) continue;

			ctx.waitUntil(
				reply({ replyToken, messages, accessToken: env.LINE_MESSAGING_ACCESS_TOKEN})
					.then((r) => console.log('LINE reply result', r))
					.catch((e) => console.error('LINE reply error', e))
			);
		}

		return Response.json({ message: 'Success' });
	},
};