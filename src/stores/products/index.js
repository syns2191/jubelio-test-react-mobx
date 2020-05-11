import { action, observable, computed, runInAction, toJS , autorun} from 'mobx';
import * as axios from 'axios';

export class ProductsStore {
    @observable isLoading = false;
    @observable isError = false;
    @observable page = 1;
    @observable totalCount = 0;
    @observable productsRegistry = observable.map();
    @observable limit = 10;
    @observable totalPages = 0;
    @observable edit=false;
    @observable detailProduct = {};
    @observable dialogDelete = false
    @observable searchVal = ''

    @computed get products() {
        return toJS(this.productsRegistry)
    }

    @computed get productDetail() {
        return toJS(this.detailProduct)
    }


    @action setPage(page) {
        this.page = page
    }

    @action toEdit(val) {
        this.edit = val
    }

    @action showDetail(val) {
        this.detailProduct = val
    }

    @action changeDetail(val, field) {
        this.detailProduct = {
            ...this.detailProduct, [field]: val
        }
    }

    @action onTypeSearch(val) {
        this.searchVal = val
    }

    @action operateDialog(val) {
        this.dialogDelete = val
    }

    @action async deleteProduct() {
        try {
            let { data } = await axios.delete(`${process.env.BACKEND_URL}/api/v1/products/${this.detailProduct.id}`);
            runInAction(() => {
                this.productsRegistry = this.productsRegistry.filter(item => item.id != this.detailProduct.id);
                this.totalCount = this.totalCount - 1
                this.totalPages = Math.ceil(this.totalCount / this.limit);
                this.dialogDelete = false;
            })
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
                this.isError = true;
            })
        }
    }

    @action async getProducts() {
        this.isLoading = true;
        try {
            let { data } = await axios.get(`${process.env.BACKEND_URL}/api/v1/products?page=${this.page}&&limit=${this.limit}&&name=${this.searchVal}`);
            runInAction(() => {
                this.isLoading = false;
                this.productsRegistry = data.data;
                this.totalCount = data.total;
                this.totalPages = Math.ceil(data.total / this.limit);
            })
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
                this.isError = true;
            })
        }

    }

    @action async updateProduct() {
        try {
            let { data } = await axios.patch(`${process.env.BACKEND_URL}/api/v1/products/${this.detailProduct.id}`, {
                name: this.detailProduct.name,
                price: this.detailProduct.price,
                description: this.detailProduct.description
            });
            runInAction(() => {
                this.isLoading = false;
                this.productsRegistry = this.productsRegistry.map(item => {
                    if (item.id === this.detailProduct.id) {
                        item = this.detailProduct
                    }
                    return item
                })
                this.edit = false
            })
        } catch (error) {
            
        }
    }
}

export default new ProductsStore();