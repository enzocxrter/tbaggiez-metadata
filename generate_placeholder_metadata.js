const fs = require("fs");
const path = require("path");

// Folder where JSON files will be written
const OUT_DIR = path.join(__dirname, "metadata_placeholder");

// Your placeholder image CID
const IMAGE_CID = "bafkreiaw7jficxw5bzolzsjuqsf2ebpe6vtknbgz2ppzh5a546q7zjuacy";

// Simple description text (you can tweak this)
const DESCRIPTION = "Your T-Baggiez image and traits are coming thoooon";

// Ensure output directory exists
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// How many NFTs
const TOTAL = 3333;

for (let i = 1; i <= TOTAL; i++) {
  const metadata = {
    name: `T-Baggiez #${i}`,
    description: DESCRIPTION,
    image: `ipfs://${IMAGE_CID}`
    // If you want, you can also add attributes later:
    // attributes: [
    //   { trait_type: "Phase", value: "Pre-reveal" }
    // ]
  };

  const filePath = path.join(OUT_DIR, `${i}.json`);
  fs.writeFileSync(filePath, JSON.stringify(metadata, null, 2), "utf8");
}

console.log(`Done. Wrote ${TOTAL} JSON files to: ${OUT_DIR}`);
