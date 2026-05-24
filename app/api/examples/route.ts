import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const examples = [];
  const dataDir = path.join(process.cwd(), "public", "data");

  try {
    let id = 1;
    while (true) {
      const filePath = path.join(dataDir, `example${id}.txt`);
      
      if (!fs.existsSync(filePath)) {
        break;
      }

      const fileContent = fs.readFileSync(filePath, "utf-8");
      const lines = fileContent.split("\n");
      
      const example: {
        id: number;
        name: string;
        description: string;
        image: string;
        modalImage: string;
        modalDescription: string;
      } = {
        id,
        name: "",
        description: "",
        image: `/images/image${id}.jpg`,
        modalImage: `/images/modalimage${id}.jpg`,
        modalDescription: "",
      };

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("name:")) {
          example.name = trimmed.substring(5).trim();
        } else if (trimmed.startsWith("description:")) {
          example.description = trimmed.substring(12).trim();
        } else if (trimmed.startsWith("modaldescription:")) {
          example.modalDescription = trimmed.substring(17).trim();
        }
      });

      if (example.name) {
        examples.push(example);
      }
      id++;
    }
  } catch (error) {
    console.error("Error loading examples:", error);
  }

  return NextResponse.json(examples);
}

