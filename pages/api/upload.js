import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb'
        }
    }
};

export default async (req, res) => {
    if (req.method === 'POST') {
        const { file } = req.body;
        const filePath = path.join(process.cwd(), 'uploads', file.name);

        fs.writeFile(filePath, file.data, 'base64', (err) => {
            if (err) {
                return res.status(500).json({ message: 'File upload failed' });
            }
            res.status(200).json({ message: 'File uploaded successfully!' });
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};