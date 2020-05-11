import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Ccard from '../../components/listCardPagination';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Pagination } from '@material-ui/lab';
import SkeletonProduct from '../../components/skeletonProduct';
const styles = theme => ({
    box: {
        paddingTop: 30,
        paddingBottom: 40,
        textAlign: 'center'
    }
})
@inject('ProductsStore')
@withRouter
@observer

class Products extends React.Component {
    componentDidMount() {
        this.triggerGetProductAction()
    }

    triggerGetProductAction() {
        this.props.ProductsStore.getProducts()
    }

    onChangePage(page) {
        this.props.ProductsStore.setPage(page)
        this.triggerGetProductAction()
    }

    showPaginaton(totalPages) {
         return (
            <Grid item xs={6} sm={4}>
                    <Pagination count={totalPages} variant="outlined" shape="rounded" onChange={(e, page) => this.onChangePage(page)}/>
            </Grid>
        )
    }

    handleEdit(val) {
        this.props.ProductsStore.toEdit(!val)
    }

    getDetail(item) {
        this.props.ProductsStore.showDetail(item)
    }

    onChangeData(val, field) {
        this.props.ProductsStore.changeDetail(val, field)
    }

    modalSaveChange() {
        this.props.ProductsStore.updateProduct()
    }

    dialogOperate(val) {
        this.props.ProductsStore.operateDialog(!val)
    }

    dialogYes() {
        this.props.ProductsStore.deleteProduct()
    }


    render() {
        const { classes } = this.props;
        const { products, totalPages, isLoading, edit, productDetail, dialogDelete } = this.props.ProductsStore;
        return (
            <div>
                <Grid container alignItems="center" justify="center" className={classes.box} spacing={4}>
                    {totalPages > 0 && this.showPaginaton(totalPages)}
                    <Grid item xs={11} sm={10}>
                        {isLoading && <SkeletonProduct />}
                        {!isLoading && <Ccard
                            products={products.length ? products : []}
                            showModal={edit}
                            handleEdit={() => this.handleEdit(edit)}
                            closeModal={() => this.handleEdit(edit)}
                            data={productDetail}
                            onShow={(val) => this.getDetail(val)}
                            onDataChange={(val, field) => this.onChangeData(val, field)}
                            saveChange={() => this.modalSaveChange()}
                            showDeleteAlert={dialogDelete}
                            dialogYes={() => this.dialogYes()}
                            dialogNo={() => this.dialogOperate(dialogDelete)}
                            handleDelete={() => this.dialogOperate(dialogDelete)}

                        />}
                    </Grid>
                    {totalPages > 0 && this.showPaginaton(totalPages)}
                </Grid>
            </div>
        )
    }
}

Products.prototype = {
    classes: PropTypes.objectOrObservableObject.isRequired,
}
export default withStyles(styles)(Products)