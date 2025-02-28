import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const runtime = "nodejs";

export const POST = async (req, res) => {
    const formData = await req.formData();

    const file = formData.get("file");
    const fileName = formData.get("fileName");
    
    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    try {
        await writeFile(
            path.join(process.cwd(), "uploads/img/" + fileName),
            buffer
        );

        return NextResponse.json({ message: "File uploaded", status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
    }
}
