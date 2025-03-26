"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
// Define Flashcard class
class Flashcard {
    question;
    answer;
    bucket;
    tags;
    constructor(question, answer, bucket, tags) {
        this.question = question;
        this.answer = answer;
        this.bucket = bucket;
        this.tags = tags;
    }
}
// Function to categorize flashcards into buckets
function toBucketSets(flashcards) {
    const bucketMap = new Map();
    flashcards.forEach((card) => {
        if (!bucketMap.has(card.bucket)) {
            bucketMap.set(card.bucket, new Set());
        }
        bucketMap.get(card.bucket)?.add(card);
    });
    return bucketMap;
}
// Function to get bucket range
function getBucketRange(bucket) {
    return [bucket, bucket * 2]; // Adjust logic if necessary
}
// Function to update flashcard bucket based on answer difficulty
var AnswerDifficulty;
(function (AnswerDifficulty) {
    AnswerDifficulty[AnswerDifficulty["Easy"] = 0] = "Easy";
    AnswerDifficulty[AnswerDifficulty["Medium"] = 1] = "Medium";
    AnswerDifficulty[AnswerDifficulty["Hard"] = 2] = "Hard";
})(AnswerDifficulty || (AnswerDifficulty = {}));
function update(flashcard, difficulty, currentBucket) {
    if (difficulty === AnswerDifficulty.Easy) {
        flashcard.bucket = currentBucket + 1;
    }
    else if (difficulty === AnswerDifficulty.Hard) {
        flashcard.bucket = Math.max(1, currentBucket - 1);
    }
}
// Function to simulate a practice session
function practice(bucketMap, bucket) {
    return bucketMap.get(bucket) || new Set();
}
// Unit Tests
describe("Flashcard Algorithm Tests", function () {
    it("should correctly categorize flashcards into buckets", function () {
        const flashcards = [
            new Flashcard("Q1", "A1", 1, ["tag1"]),
            new Flashcard("Q2", "A2", 2, ["tag2"]),
            new Flashcard("Q3", "A3", 1, ["tag3"]),
        ];
        const result = toBucketSets(flashcards);
        assert_1.default.strictEqual(result.size, 2);
        assert_1.default.strictEqual(result.get(1)?.size, 2);
        assert_1.default.strictEqual(result.get(2)?.size, 1);
    });
    it("should return correct bucket range", function () {
        assert_1.default.deepStrictEqual(getBucketRange(1), [1, 2]);
        assert_1.default.deepStrictEqual(getBucketRange(5), [5, 10]);
    });
    it("should correctly update flashcard bucket", function () {
        const flashcard = new Flashcard("Q1", "A1", 1, ["tag1"]);
        update(flashcard, AnswerDifficulty.Easy, 1);
        assert_1.default.strictEqual(flashcard.bucket, 2);
    });
    it("should return correct flashcards from practice function", function () {
        const flashcards = [new Flashcard("Q1", "A1", 1, ["tag1"])];
        const bucketMap = new Map([[1, new Set(flashcards)]]);
        const result = practice(bucketMap, 1);
        assert_1.default.strictEqual(result.size, 1);
    });
});
