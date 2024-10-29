import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false, // Next.js에서 FormData를 수신하기 위해 설정
    }
};

export default async (req, res) => {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.uploadDir = path.join(process.cwd(), '/uploads'); // 업로드 경로 설정
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.status(500).json({ message: 'File upload failed' });
                return;
            }
            // 성공 시 파일 정보 응답
            res.status(200).json({ message: 'File uploaded successfully!', files });
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};