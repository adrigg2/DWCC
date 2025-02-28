import { NextResponse } from "next/server";
import path from "path";
import { unlink } from "fs/promises";

export const runtime = "nodejs";

export const DELETE = async (req, res, params) => {
    try {
        const { fileName } = params;

        await unlink(path.join(process.cwd(), "uploads/img/" + fileName));

        return NextResponse.json({ message: "File deleted succesfully", status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error deleting file" }, { status: 500 });
    }
}
