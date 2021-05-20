console.clear();
const apiUrl = 'https://vue3-course-api.hexschool.io';
const apiPath = 'aquamanda88';
const productListNum = document.querySelector("#productCount");

const app = {
    data: {
      products: [],
    },
    getData() {
      const url = `${apiUrl}/api/${apiPath}/admin/products`;
      axios.get(url)
      .then(res => {
        // console.log(res);
        if (res.data.success) {
          this.data.products = res.data.products;
          // console.log(this.data.products);
          this.render();
        }
      })
    },
    render() {
      const productListDom = document.querySelector("#productList");
      productListNum.textContent = this.data.products.length;
      let template = "";
      this.data.products.forEach((item) => {
        template += `
          <tr>
            <td>${item.title}</td>
            <td class="text-center" width="120">
              ${parseInt(item.origin_price).toLocaleString()}
            </td>
            <td class="text-center" width="120">
            ${parseInt(item.price).toLocaleString()}
            </td>
            <td class="text-center" width="100">
              <span class="${item.is_enabled ? 'text-success' : 'text-secondary'}">${item.is_enabled ? '啟用' : '未啟用'}</span>
            </td>
            <td class="text-center" width="120">
              <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
            </td>
          </tr>
        `;
        // console.log(template);
        productListDom.innerHTML = template;
        const deleteBtn = document.querySelectorAll('.deleteBtn');
        deleteBtn.forEach(btn => {
          btn.addEventListener('click', this.deleteProduct);
        })
      })
    },
    deleteProduct(e) {
      // 事件物件
      const id = e.target.dataset.id;
      // console.log("deleteProduct", e, id);
      axios.delete(`${apiUrl}/api/${apiPath}/admin/product/${id}`)
      .then(res =>{
        // console.log(res);
        app.getData();
      });
    },
    init() {
      // 取出 Cookie
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;
      this.getData();
    }
  }
  app.init();