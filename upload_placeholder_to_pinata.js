const pinataSDK = require("@pinata/sdk");
const path = require("path");

// 1) PASTE YOUR NEW PINATA API KEY + SECRET HERE:
const PINATA_API_KEY = "65a7d7f53a9682fb72ef";
const PINATA_API_SECRET = "62c57f5ab16ad1559e554989bff387bc618af64bd6cfd10e24c427a2fadb3e21";

// 2) Folder that contains 1.json ... 3333.json
const METADATA_DIR = path.join(__dirname, "metadata_placeholder");

async function main() {
  if (
    !PINATA_API_KEY ||
    PINATA_API_KEY === "YOUR_NEW_PINATA_API_KEY" ||
    !PINATA_API_SECRET ||
    PINATA_API_SECRET === "YOUR_NEW_PINATA_API_SECRET"
  ) {
    console.error("❌ Please set your Pinata API key and secret in the script.");
    process.exit(1);
  }

  const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

  console.log("Testing Pinata authentication...");
  try {
    await pinata.testAuthentication();
    console.log("✅ Pinata authentication successful.");
  } catch (err) {
    console.error("❌ Pinata authentication failed:");
    console.error(err);
    process.exit(1);
  }

  console.log("Uploading folder to Pinata:", METADATA_DIR);

  try {
    const result = await pinata.pinFromFS(METADATA_DIR);
    console.log("\n✅ Upload complete!");
    console.log("Pinata raw result:", result);
    console.log("\nDirectory CID (IpfsHash):", result.IpfsHash);
    console.log(
      `Example JSON URL: https://gateway.pinata.cloud/ipfs/${result.IpfsHash}/1.json`
    );
  } catch (err) {
    console.error("❌ Upload failed:");
    console.error(err);
    process.exit(1);
  }
}

main();