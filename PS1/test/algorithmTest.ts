import assert from "assert";

// Define Flashcard class
class Flashcard {
  constructor(
    public question: string,
    public answer: string,
    public bucket: number,
    public tags: string[]
  ) {}
}

// Define BucketMap type
type BucketMap = Map<number, Set<Flashcard>>;

// Function to categorize flashcards into buckets
function toBucketSets(flashcards: Flashcard[]): BucketMap {
  const bucketMap: BucketMap = new Map();

  flashcards.forEach((card) => {
    if (!bucketMap.has(card.bucket)) {
      bucketMap.set(card.bucket, new Set());
    }
    bucketMap.get(card.bucket)?.add(card);
  });

  return bucketMap;
}

// Function to get bucket range
function getBucketRange(bucket: number): number[] {
  return [bucket, bucket * 2]; // Adjust logic if necessary
}

// Function to update flashcard bucket based on answer difficulty
enum AnswerDifficulty {
  Easy,
  Medium,
  Hard,
}

function update(
  flashcard: Flashcard,
  difficulty: AnswerDifficulty,
  currentBucket: number
) {
  if (difficulty === AnswerDifficulty.Easy) {
    flashcard.bucket = currentBucket + 1;
  } else if (difficulty === AnswerDifficulty.Hard) {
    flashcard.bucket = Math.max(1, currentBucket - 1);
  }
}

// Function to simulate a practice session
function practice(bucketMap: BucketMap, bucket: number): Set<Flashcard> {
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

    assert.strictEqual(result.size, 2);
    assert.strictEqual(result.get(1)?.size, 2);
    assert.strictEqual(result.get(2)?.size, 1);
  });

  it("should return correct bucket range", function () {
    assert.deepStrictEqual(getBucketRange(1), [1, 2]);
    assert.deepStrictEqual(getBucketRange(5), [5, 10]);
  });

  it("should correctly update flashcard bucket", function () {
    const flashcard = new Flashcard("Q1", "A1", 1, ["tag1"]);
    update(flashcard, AnswerDifficulty.Easy, 1);
    assert.strictEqual(flashcard.bucket, 2);
  });

  it("should return correct flashcards from practice function", function () {
    const flashcards = [new Flashcard("Q1", "A1", 1, ["tag1"])];
    const bucketMap: BucketMap = new Map([[1, new Set(flashcards)]]);

    const result = practice(bucketMap, 1);
    assert.strictEqual(result.size, 1);
  });
});
