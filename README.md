

### Executar projeto
npm run dev

### Backend utilizando mysql com xampp

### Iniciando projeto
npm init -y

### Instalar express
npm install --save express
npm install @types/express --save-dev
versao express 4.18.2

### Instalar Nodemon
npm install nodemon --save-dev 


### Instalar Prisma
npm install prisma --save-dev
npx prisma
npm prisma generate  
npm install @prisma/client
versao @prisma/client 4.11.0

### Instalar ts-node
npm install ts-node
versao ts-node 10.9.1
### Iniciar Typescript
npx tsc --init

### Configurar arquivo .env
DATABASE_URL="mysql://root@localhost:3306/todolist"

### Configurar arquivo schema.prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Task {
  id        Int     @id @default(autoincrement())
  task     String
  completed Boolean @default(false)
}

### Criar tabela no banco de dados
npx prisma migrate dev

### Configurar script package.json
"scripts": {
    "start:dev": "nodemon",
    "build": "npx tsc" 
},
### Criar nodemon.json
{
    "watch": ["src"],
    "ext": ".ts,.js",
    "ignore": [],
    "exec": "ts-node ./src/index.ts"
}

### Executar servidor node
npm run start:dev

