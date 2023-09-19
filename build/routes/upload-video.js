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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideoRoute = void 0;
const multipart_1 = require("@fastify/multipart");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_stream_1 = require("node:stream");
const node_util_1 = require("node:util");
const node_crypto_1 = require("node:crypto");
const prisma_1 = require("../lib/prisma");
const pump = (0, node_util_1.promisify)(node_stream_1.pipeline);
function uploadVideoRoute(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.register(multipart_1.fastifyMultipart, {
            limits: {
                fileSize: 1048576 * 25, // file size 25mb
            }
        });
        app.post('/videos', (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield req.file();
            if (!data) {
                return reply.status(400).send({ error: 'Missing file input' });
            }
            const extension = node_path_1.default.extname(data.filename);
            if (extension !== '.mp3') {
                return reply.status(400).send({ error: 'Invalid input type, please upload a MP3' });
            }
            const fileBaseName = node_path_1.default.basename(data.filename, extension);
            const fileUploadName = `${fileBaseName}-${(0, node_crypto_1.randomUUID)()}${extension}`;
            const uploadDestination = node_path_1.default.resolve(__dirname, '../../tmp', fileUploadName);
            yield pump(data.file, node_fs_1.default.createWriteStream(uploadDestination));
            const video = yield prisma_1.prisma.video.create({
                data: {
                    name: data.filename,
                    path: uploadDestination,
                }
            });
            return {
                video
            };
        }));
    });
}
exports.uploadVideoRoute = uploadVideoRoute;
