"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAiCompletionRoute = void 0;
const zod_1 = require("zod");
const ai_1 = require("ai");
const prisma_1 = require("../lib/prisma");
const openai_1 = require("../lib/openai");
function generateAiCompletionRoute(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/ai/complete', (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const bodySchema = zod_1.z.object({
                videoId: zod_1.z.string().uuid(),
                prompt: zod_1.z.string(),
                temperature: zod_1.z.number().min(0).max(1).default(0.5),
            });
            const { videoId, prompt, temperature } = bodySchema.parse(req.body);
            const video = yield prisma_1.prisma.video.findUniqueOrThrow({
                where: {
                    id: videoId,
                }
            });
            if (!video.transcription) {
                return reply.status(400).send({ error: 'Video trascription was not generated yet.' });
            }
            const promptMessage = prompt.replace('{transcription}', video.transcription);
            const response = yield openai_1.openai.chat.completions.create({
                model: 'gpt-3.5-turbo-16k',
                temperature,
                messages: [
                    { role: 'user', content: promptMessage }
                ],
                stream: true,
            });
            const stream = (0, ai_1.OpenAIStream)(response);
            (0, ai_1.streamToResponse)(stream, reply.raw, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                }
            });
        }));
    });
}
exports.generateAiCompletionRoute = generateAiCompletionRoute;
