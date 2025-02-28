import { NextResponse } from "next/server";
import path from "path";
import { unlink, readFile } from "fs/promises";
import fs from "fs";

export const runtime = "nodejs";

export const DELETE = async (req, { params }) => {
    try {
        const { fileName } = await params;

        await unlink(path.join(process.cwd(), "uploads/img/" + fileName));

        return NextResponse.json({ message: "File deleted succesfully", status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error deleting file" }, { status: 500 });
    }
}

export const GET = async (req, { params }) => {
    try {
        const { fileName } = await params;
        const filePath = path.join(process.cwd(), "uploads/img/" + fileName);

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        const fileBuffer = await readFile(filePath);

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": "image/" + fileName.split(".").pop(),
                "Content-Disposition": `inline; filename="${fileName}"`,
            }
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error retrieving file" }, { status: 500 });
    }
}

