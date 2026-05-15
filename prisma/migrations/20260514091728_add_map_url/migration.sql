/*
  Warnings:

  - You are about to drop the column `landAreaSqm` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `areaSqmMax` on the `UnitType` table. All the data in the column will be lost.
  - You are about to drop the column `available` on the `UnitType` table. All the data in the column will be lost.
  - You are about to drop the column `floorMax` on the `UnitType` table. All the data in the column will be lost.
  - You are about to drop the column `floorMin` on the `UnitType` table. All the data in the column will be lost.
  - You are about to drop the column `priceMax` on the `UnitType` table. All the data in the column will be lost.
  - You are about to drop the column `priceMin` on the `UnitType` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerSqm` on the `UnitType` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "landAreaSqm",
ADD COLUMN     "developer" TEXT,
ADD COLUMN     "listingType" TEXT NOT NULL DEFAULT 'Sale',
ADD COLUMN     "mapUrl" TEXT,
ADD COLUMN     "projectStatus" TEXT,
ADD COLUMN     "startingPrice" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "UnitType" DROP COLUMN "areaSqmMax",
DROP COLUMN "available",
DROP COLUMN "floorMax",
DROP COLUMN "floorMin",
DROP COLUMN "priceMax",
DROP COLUMN "priceMin",
DROP COLUMN "pricePerSqm",
ADD COLUMN     "images" TEXT[];
