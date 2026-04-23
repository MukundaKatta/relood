"use client";

import { useRef, useState } from "react";
import Link from "next/link";

type Condition = "like-new" | "good" | "fair";

interface ListedItem {
  photoUrl: string;
  size: string;
  price: string;
  condition: Condition;
}

const MOCK_ITEMS = [
  { emoji: "👕", label: "Baby Gap tee · 2-3Y", price: "$4", dist: "0.8mi", bg: "from-lime-100 to-lime-200", condition: "Like new" },
  { emoji: "🧸", label: "Melissa & Doug set", price: "$18", dist: "1.2mi", bg: "from-orange-100 to-red-200", condition: "Good" },
  { emoji: "👟", label: "Nikes sz 10C", price: "$12", dist: "0.4mi", bg: "from-sky-100 to-blue-200", condition: "Like new" },
  { emoji: "🎒", label: "Pottery Barn bag", price: "$15", dist: "2.0mi", bg: "from-rose-100 to-pink-200", condition: "Good" },
  { emoji: "🧥", label: "Patagonia jacket · 4T", price: "$22", dist: "1.5mi", bg: "from-violet-100 to-purple-200", condition: "Fair" },
];

const CONDITION_LABELS: Record<Condition, string> = {
  "like-new": "Like new",
  "good": "Good",
  "fair": "Fair",
};

export default function TryPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState<Condition>("good");
  const [listed, setListed] = useState<ListedItem | null>(null);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUrl(URL.createObjectURL(file));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!photoUrl || !size || !price) return;
    setListed({ photoUrl, size, price, condition });
  }

  function handleReset() {
    setListed(null);
    setPhotoUrl(null);
    setSize("");
    setPrice("");
    setCondition("good");
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-lime-500" />
          Relood
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        {!listed ? (
          <>
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-lime-600">
                Mock listing
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight">
                List an item — see how it looks.
              </h1>
              <p className="mt-2 text-sm text-neutral-500">
                Upload a photo, fill in the details, and preview your card in the marketplace grid.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm space-y-5">
              {/* Photo upload */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Item photo
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition ${
                    photoUrl
                      ? "border-lime-400 bg-lime-50"
                      : "border-neutral-300 hover:border-neutral-400"
                  } p-6`}
                >
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="Preview"
                      className="h-40 w-40 rounded-xl object-cover"
                    />
                  ) : (
                    <>
                      <span className="text-3xl">📷</span>
                      <p className="mt-2 text-sm text-neutral-500">
                        Click to choose a photo
                      </p>
                    </>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhoto}
                  />
                </div>
              </div>

              {/* Size */}
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-neutral-700 mb-2">
                  Size
                </label>
                <input
                  id="size"
                  type="text"
                  placeholder="e.g. 3T, 5Y, 10C, XS"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  required
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-neutral-700 mb-2">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-neutral-500">
                    $
                  </span>
                  <input
                    id="price"
                    type="number"
                    min="1"
                    max="999"
                    placeholder="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-8 pr-4 text-sm placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
                  />
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Condition
                </label>
                <div className="flex gap-2">
                  {(["like-new", "good", "fair"] as Condition[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCondition(c)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        condition === c
                          ? "border-lime-500 bg-lime-50 text-lime-700"
                          : "border-neutral-300 text-neutral-600 hover:border-neutral-400"
                      }`}
                    >
                      {CONDITION_LABELS[c]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!photoUrl}
                className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-40"
              >
                Preview my listing →
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-neutral-400">
              This is a v0 preview — no data is stored.{" "}
              <Link href="/#waitlist" className="underline hover:text-neutral-600">
                Join the waitlist
              </Link>{" "}
              for the real app.
            </p>
          </>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-lime-600">
                Marketplace preview
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight">
                Your item, live in the grid.
              </h1>
              <p className="mt-2 text-sm text-neutral-500">
                This is how buyers would see your listing alongside nearby items.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {/* User's card — highlighted */}
              <div className="rounded-2xl border-2 border-lime-400 overflow-hidden shadow-sm">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={listed.photoUrl}
                    alt="Your listing"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-2.5 bg-lime-50">
                  <div className="text-xs font-semibold text-lime-700 truncate">
                    Your item · {listed.size}
                  </div>
                  <div className="text-xs text-neutral-600">
                    ${listed.price} · {CONDITION_LABELS[listed.condition]} · 0.0mi
                  </div>
                </div>
              </div>

              {/* Mock items */}
              {MOCK_ITEMS.map((item) => (
                <div key={item.label} className="rounded-2xl border border-neutral-200 overflow-hidden">
                  <div
                    className={`aspect-square bg-gradient-to-br ${item.bg} flex items-center justify-center text-4xl`}
                  >
                    {item.emoji}
                  </div>
                  <div className="p-2.5">
                    <div className="text-xs font-medium truncate">{item.label}</div>
                    <div className="text-xs text-neutral-500">
                      {item.price} · {item.condition} · {item.dist}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleReset}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                List another item
              </button>
              <Link
                href="/#waitlist"
                className="rounded-full border border-neutral-300 px-7 py-3.5 font-medium text-neutral-900 text-center transition hover:border-neutral-900"
              >
                Get early access
              </Link>
            </div>

            <p className="mt-6 text-center text-xs text-neutral-400">
              This is a v0 preview — no data is stored or published.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
