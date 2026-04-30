"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewSchema = exports.createReviewSchema = void 0;
const zod_1 = require("zod");
// Esses schemas validam os dados da review antes de chegar no banco.
exports.createReviewSchema = zod_1.z.object({
    title: zod_1.z.string(),
    mediaType: zod_1.z.string(),
    rating: zod_1.z.number(),
    positives: zod_1.z.string(),
    negatives: zod_1.z.string(),
    tmdbId: zod_1.z.number().nullable().optional(),
    posterUrl: zod_1.z.string().nullable().optional(),
    year: zod_1.z.string().nullable().optional(),
});
exports.updateReviewSchema = zod_1.z.object({
    rating: zod_1.z.number(),
    positives: zod_1.z.string(),
    negatives: zod_1.z.string(),
});
