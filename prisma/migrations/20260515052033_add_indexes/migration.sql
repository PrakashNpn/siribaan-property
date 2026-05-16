-- CreateIndex
CREATE INDEX "Inquiry_propertyId_idx" ON "Inquiry"("propertyId");

-- CreateIndex
CREATE INDEX "Inquiry_read_idx" ON "Inquiry"("read");

-- CreateIndex
CREATE INDEX "Property_status_idx" ON "Property"("status");

-- CreateIndex
CREATE INDEX "Property_type_idx" ON "Property"("type");

-- CreateIndex
CREATE INDEX "Property_featured_idx" ON "Property"("featured");

-- CreateIndex
CREATE INDEX "Property_status_featured_idx" ON "Property"("status", "featured");

-- CreateIndex
CREATE INDEX "Property_createdAt_idx" ON "Property"("createdAt");
