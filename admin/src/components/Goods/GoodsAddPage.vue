<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{infoForm.id ? '编辑商品' : '添加商品'}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
          <el-form-item label="所属分类">
            <el-cascader :options="categorys" placeholder="请选择分类" v-model="infoForm.category_id">
            </el-cascader>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="infoForm.name"></el-input>
          </el-form-item>
          <el-form-item label="所属品牌" prop="brand_id">
            <el-select v-model="infoForm.brand_id" placeholder="请选择品牌">
              <el-option
                v-for="item in brands"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品简介" prop="goods_brief">
            <el-input type="textarea" v-model="infoForm.goods_brief" :rows="3"></el-input>
            <div class="form-tip"></div>
          </el-form-item>
          <el-form-item label="商品主图" prop="primary_pic_url">
            <el-upload class="image-uploader" name="brand_pic"
                       action="http://127.0.0.1:8360/admin/upload/brandPic" :show-file-list="true"
                       :on-success="handleUploadPrimaryImageSuccess" :headers="uploaderHeader">
              <img v-if="infoForm.primary_pic_url" :src="infoForm.primary_pic_url" class="image-show">
              <i v-else class="el-icon-plus image-uploader-icon"></i>
            </el-upload>
            <div class="form-tip">图片尺寸：750*420</div>
          </el-form-item>
          <el-form-item label="商品列表图片" prop="list_pic_url">
            <el-upload class="image-uploader" name="brand_pic"
                       action="http://127.0.0.1:8360/admin/upload/brandPic" :show-file-list="true"
                       :on-success="handleUploadImageSuccess" :headers="uploaderHeader">
              <img v-if="infoForm.list_pic_url" :src="infoForm.list_pic_url" class="image-show">
              <i v-else class="el-icon-plus image-uploader-icon"></i>
            </el-upload>
            <div class="form-tip">图片尺寸：750*420</div>
          </el-form-item>
          <el-form-item label="库存" prop="goods_number">
            <el-input-number v-model="infoForm.goods_number" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="商品价格" prop="retail_price">
            <el-input v-model.number="infoForm.retail_price" :rows="3"></el-input>
            <div class="form-tip"></div>
          </el-form-item>
          <el-form-item label="推荐类型">
            <el-checkbox label="新品" name="type" v-model="infoForm.is_new"></el-checkbox>
            <el-checkbox label="人气" name="type" v-model="infoForm.is_hot"></el-checkbox>
          </el-form-item>
          <el-form-item label="上架">
            <el-switch on-text="" off-text=""
            v-model="infoForm.is_on_sale"
            :on-value="1"
            :off-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="infoForm.sort_order" :min="1" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitInfo">确定保存</el-button>
            <el-button @click="goBackPage">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/config/api';
  export default {
    data() {
      return {
        uploaderHeader: {
          'X-Nideshop-Token': localStorage.getItem('token') || '',
        },
        categorys: [],
        brands: [],
        infoForm: {
          id: 0,
          category_id: null,
          name: "",
          brand_id: null,
          primary_pic_url: null,
          list_pic_url: '',
          goods_brief: '',
          pic_url: '',
          sort_order: 100,
          floor_price: 0,
          app_list_pic_url: '',
          is_new: false,
          new_pic_url: "",
          new_sort_order: 10,
          goods_number: 0,
          is_on_sale: 0,
          retail_price: null,
          goods_unit: '件',// 未弄到编辑的那
        },
        infoRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          brand_id: [
            { required: true, message: '请选择品牌', trigger: 'blur',type: 'number' },
          ],
          goods_brief: [
            { required: true, message: '请输入简介', trigger: 'blur' },
          ],
          primary_pic_url: [
            { required: true, message: '请选择商品主图', trigger: 'blur' },
          ],
          list_pic_url: [
            { required: true, message: '请选择商品图片', trigger: 'blur' },
          ],
          retail_price: [
            { required: true, message: '请输入商品价格', trigger: 'blur', type: 'number'},
          ],
        },
      }
    },
    methods: {
      goBackPage() {
        this.$router.go(-1);
      },
      onSubmitInfo() {
        var infoForm = this.infoForm
        this.$refs['infoForm'].validate((valid) => {
          if (valid) {
            this.axios.post('goods/store', {
              ...infoForm,
              is_new: infoForm.is_new,
              is_hot: infoForm.is_hot,
              category_id: infoForm.category_id[1]
            }).then((response) => {
              if (response.data.errno === 0) {
                this.$message({
                  type: 'success',
                  message: '保存成功'
                });
                this.$router.go(-1)
              } else {
                this.$message({
                  type: 'error',
                  message: '保存失败'
                })
              }
            })
          } else {
            return false;
          }
        });
      },
      handleUploadImageSuccess(res, file) {
        if (res.errno === 0) {
          this.infoForm.list_pic_url = res.data.fileUrl;
        }
      },
      handleUploadPrimaryImageSuccess(res, file) {
        if (res.errno === 0) {
          this.infoForm.primary_pic_url = res.data.fileUrl;
        }
      },
      fetchInfo(cb) {
        if (this.infoForm.id <= 0) {
          cb()
          return false
        }

        //加载商品详情
        let that = this
        this.axios.get('goods/info', {
          params: {
            id: that.infoForm.id
          }
        }).then((response) => {
          let resInfo = response.data.data;
          resInfo.is_new = resInfo.is_new ? true : false;
          resInfo.is_hot = resInfo.is_hot ? true : false;
          resInfo.category_id = [resInfo.category_id]
          that.infoForm = resInfo;
          cb()
        }, () => {
        })
      },
      fetchCategory() {
        this.axios.get('category', {
          params: {
            page: 1,
          }
        }).then(({data}) => {
          var categorys = []

          data.data.forEach(category => {
            if(category.level == 1) {
              categorys.push({
                value: category.id,
                label: category.name,
                children: data.data
                  .filter(subCategory => subCategory.level == 2 && subCategory.parent_id == category.id)
                  .map(subCategory => {
                    if(this.infoForm.category_id && subCategory.id == this.infoForm.category_id[0]) {
                      // 找到二级分类对应的一级分类的id
                      this.infoForm.category_id = [category.id, this.infoForm.category_id[0]]
                    }
                    return {
                      value: subCategory.id,
                      label: subCategory.name
                    }
                  })
              })
            }
          })
          // debugger
          this.categorys = categorys

        })
      },
      fetchBrand(current = 1) {
        this.axios.get('brand', {
          params: {
            page: current,
            pageSize: 100
          }
        }).then(({data}) => {
          this.brands = this.brands.concat(data.data.data)
          // 递归的方式 加载所有的
          if(current != data.data.totalPages) {
            this.fetchBrand(current + 1)
          }
        })
      }

    },
    components: {},
    mounted() {
      this.infoForm.id = this.$route.query.id || 0

      this.fetchInfo(() => {
        this.fetchCategory()
        this.fetchBrand()
      })
      
    }
  }

</script>

<style>
  .image-uploader{
    height: 105px;
  }
  .image-uploader .el-upload {
    border: 1px solid #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .image-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .image-uploader .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 187px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }

  .image-uploader .image-show {
    width: 187px;
    height: 105px;
    display: block;
  }

  .image-uploader.new-image-uploader {
    font-size: 28px;
    color: #8c939d;
    width: 165px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }

  .image-uploader.new-image-uploader .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 165px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }

  .image-uploader.new-image-uploader .image-show {
    width: 165px;
    height: 105px;
    display: block;
  }
</style>
