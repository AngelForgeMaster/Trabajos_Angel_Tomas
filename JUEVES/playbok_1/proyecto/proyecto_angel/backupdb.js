import { PrismaClient } from '@prisma/client';
import fs from 'fs';


const prisma = new PrismaClient();


async function backup() {
    const data = {};


    // obtiene todos los modelos automáticamente
    const models = Object.keys(prisma).filter(
        (key) => !key.startsWith('_') && typeof prisma[key]?.findMany === 'function'
    );


    for (const model of models) {
        console.log(`Exportando: ${model}`);
        data[model] = await prisma[model].findMany();
    }


    fs.writeFileSync('backup.json', JSON.stringify(data, null, 2));


    console.log('Backup completo generado: backup.json');
}


backup()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
