import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const backupDatabase = (req, res) => {
  const scriptPath = path.join(__dirname, "../../scripts/mongo-backup.bat");

  console.log("Running backup script:", scriptPath);  // Debug log

  exec(`"${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error("BACKUP ERROR:", error.message);
      return res.status(500).json({ message: "Backup failed", details: stderr });
    }

    console.log("BACKUP OUTPUT:", stdout);
    res.status(200).json({ message: "Backup completed successfully", output: stdout });
  });
};
