export class Product {
    productId: number;
    productName: string;
    productQuantity: number;
    productPrice: number;
    productDescription: string;
    productImage: string;

    constructor (ProductId: number, ProductName: string, ProductQuantity: number, ProductDescription: string, ProductPrice: number, ProductImage: string) {
        this.productId = ProductId;
        this.productName = ProductName;
        this.productQuantity = ProductQuantity;
        this.productDescription = ProductDescription;
        this.productPrice = ProductPrice;
        this.productImage = ProductImage;
    }
}
