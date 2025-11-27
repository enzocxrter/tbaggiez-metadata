const { NFTStorage, File } = require("nft.storage");
const fs = require("fs");
const path = require("path");

// 1) PASTE YOUR NFT.STORAGE API KEY HERE:
const API_KEY = "YOUR_API_KEY_HERE"; // <<< replace this string

// 2) Folder that contains 1.json ... 3333.json
const METADATA_DIR = path.join(__dirname, "metadata_placeholder");

// Helper: read all JSON files from the folder and wrap them as File objects
async function getFilesFromPath(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const filePath = path.join(dir, entry.name);
    const content = await fs.promises.readFile(filePath);

    // Each file is named e.g. "1.json", "2.json", etc.
    files.push(
      new File([content], entry.name, { type: "application/json" })
    );
  }

  return files;
}

async function main() {
  if (!API_KEY || API_KEY === "513828e8.789f138a431b455a8ac15362d624a9f2") {
    console.error("❌ Please set your NFT.Storage API key in the script.");
    process.exit(1);
  }

  console.log("Reading metadata files from:", METADATA_DIR);
  const files = await getFilesFromPath(METADATA_DIR);
  console.log(`Found ${files.length} files. Uploading to NFT.Storage...`);

  const client = new NFTStorage({ token: API_KEY });

  // This uploads the whole set as a directory and returns the root CID
  const cid = await client.storeDirectory(files);

  console.log("\n✅ Upload complete!");
  console.log("Directory CID:", cid);
  console.log(
    `Example JSON URL: https://ipfs.io/ipfs/${cid}/1.json`
  );
}

main().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
