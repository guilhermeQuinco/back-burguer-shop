-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "burguerId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_burguerId_fkey" FOREIGN KEY ("burguerId") REFERENCES "Burguer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
