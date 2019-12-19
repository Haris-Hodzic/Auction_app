import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
  productHttp: service(),
  prices: null,
  range: null,
  lowestPrice: 0,
  highestPrice: 0,
  oneBarRange: null,
  averagePrice: 0,
  sumOfPrices: 0,
  defaultSortingActiveClass: 'active',
  sortingBynewnessActiveClass: '',
  sortingByPriceActiveClass: '',
  sortingByPopularityActiveClass: '',
  gridActive: 'active',
  isGridActive: true,
  isListActive: false,
  listActive: '',
  totalNumberOfProducts: null,
  isSortingButtonActive: false,
  colorList: null,
  sizeList: null,
  pageSize: 9,
  categoryButtons: null,
  subcategories: null,
  isActiveCategory: null,
  filters: null,
  selectedSorting: 'Default Sorting',
  slider: null,
  activeFilters: null,
  init() {
    this._super(...arguments);
    this.set('filters', {
      category: '',
      subcategory: '',
      searchString: '',
      startPrice: null,
      endPrice: null,
      color: '',
      size: '',
      pageSize: 9,
      sortingType: 'id',
      order: 'descending'
    });
    this.set('isActiveCategory', {
      Women: false,
      Men: false,
      Kids: false,
      Accesorise: false,
      Home: false,
      Art: false,
      Computer: false
    });
    this.set('activeFilters', {
      category: null,
      subcategory: null,
      price: null,
      color: null,
      size: null
    });
    this.set('subcategories', {
      Women: [],
      Men: [],
      Kids: [],
      Accesorise: [],
      Home: [],
      Art: [],
      Computer: []
    });
    this.set('categoryButtons', {
      Women: '+',
      Men: '+',
      Kids: '+',
      Accesorise: '+',
      Home: '+',
      Art: '+',
      Computer: '+'
    });
        //get color and size info
        this.get('productHttp').getCountedProductColor().then((result) => {
          this.set('colorList', result);
        });
        this.get('productHttp').getCountedProductSize().then((result) => {
          this.set('sizeList', result);
        });
        //calculates price range for price graph and slider
        this.get('productHttp').getPrices().then((result) => {
          this.set('prices', result);
          this.set('totalNumberOfProducts', this.get('prices').length);
          this.set('lowestPrice', this.get('prices')[0]);
          this.set('highestPrice', this.get('prices')[this.get('prices').length - 1]);
          this.set('slider', [0, this.get('highestPrice')]);
          set(this.get('filters'), 'startPrice', Math.trunc(this.get('lowestPrice')));
          set(this.get('filters'), 'endPrice', Math.trunc(this.get('highestPrice')));
          this.set('range', this.get('highestPrice') - this.get('lowestPrice'));
          this.set('oneBarRange', this.get('range') / 20);
          var countedPrices = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          const self = this;
          this.get('prices').forEach(function(entry, index) {
            self.set('sumOfPrices', self.get('sumOfPrices') + self.get('prices')[index]);
            for (var j = 0; j < 20; j++) {
              if (self.get('prices')[index] < self.get('oneBarRange') * (j + 1)) {
                countedPrices[j] = countedPrices[j] + 1;
                break;
              }
            }
          });
          this.set('averagePrice', Math.trunc(this.get('sumOfPrices') / this.get('prices').length));
          this.set('prices', countedPrices);
        });
      },
      actions: {
        filterProductsBySubcategory(category, subcategory) {
          set(this.get('activeFilters'), 'category', category);
          set(this.get('activeFilters'), 'subcategory', subcategory);
          set(this.get('filters'), 'category', category);
          set(this.get('filters'), 'subcategory', subcategory);
          this.get('productHttp').filterProductsBySubcategory(this.get('filters')).then((result) => {
            this.set('model', result);
            this.set('totalNumberOfProducts', result.totalElements);
          });
        },
        filterProductsByCategory(category) {
          set(this.get('activeFilters'), 'category', category);
          set(this.get('filters'), 'category', category);
          this.get('productHttp').filterProductsBySubcategory(this.get('filters')).then((result) => {
            this.set('model', result);
            this.set('totalNumberOfProducts', result.totalElements);
          });
        },
        filterByPrice(value) {
          this.set('minFilteredPrice', Math.trunc(value[0]));
          this.set('maxFilteredPrice', Math.trunc(value[1]));
          set(this.get('activeFilters'), 'price', this.get('minFilteredPrice') + '$-' + this.get('maxFilteredPrice') + '$');
          set(this.get('filters'), 'startPrice', Math.trunc(value[0]));
          set(this.get('filters'), 'endPrice', Math.trunc(value[1]));
          this.get('productHttp').filterProductsBySubcategory(this.get('filters')).then((result) => {
            this.set('model', result);
          });
        },
        filterProductsByColor(color) {
          set(this.get('activeFilters'), 'color', color);
          set(this.get('filters'), 'color', color);
          this.get('productHttp').filterProductsBySubcategory(this.get('filters')).then((result) => {
            this.set('model', result);
            this.set('totalNumberOfProducts', result.totalElements);
          });
        },
        filterProductsBySize(size) {
          set(this.get('activeFilters'), 'size', size);
          set(this.get('filters'), 'size', size);
          this.get('productHttp').filterProductsBySubcategory(this.get('filters')).then((result) => {
            this.set('model', result);
            this.set('totalNumberOfProducts', result.totalElements);
          });
        },
        removeFilter(filter) {
          if (filter === 'price') {
            set(this.get('filters'), 'startPrice', this.get('lowestPrice'));
            set(this.get('filters'), 'endPrice', this.get('highestPrice'));
            set(this.get('activeFilters'), filter, null);
            this.set('slider', [0, this.get('highestPrice')]);
            this.get('productHttp').filterProductsBySubcategory(this.get('filters')).then((result) => {
              this.set('model', result);
              this.set('totalNumberOfProducts', result.totalElements);
            });
          } else {
            set(this.get('filters'), filter, '');
            set(this.get('activeFilters'), filter, null);
            this.get('productHttp').filterProductsBySubcategory(this.get('filters')).then((result) => {
              this.set('model', result);
              this.set('totalNumberOfProducts', result.totalElements);
            });
          }
        },
        listSorting() {
          if (!this.get('isSortingButtonActive')) {
            this.set('isSortingButtonActive', true);
          } else {
            this.set('isSortingButtonActive', false);
          }
        },
        setSorting(sortingType) {
          if (sortingType === 'default') {
            set(this.get('filters'), 'sortingType', 'id');
            this.get('productHttp').filterProductsBySubcategory(this.get('filters')).then((result) => {
              this.set('model', result);
            });
            this.set('defaultSortingActiveClass', 'active');
            this.set('sortingBynewnessActiveClass', '');
            this.set('sortingByPriceActiveClass', '');
            this.set('sortingByPopularityActiveClass', '');
            this.set('selectedSorting', 'Default Sorting');
            this.set('isSortingButtonActive', false);
          } else if (sortingType === 'newness') {
            set(this.get('filters'), 'sortingType', 'startDate');
            this.get('productHttp').filterProductsBySubcategory(this.get('filters')).then((result) => {
              this.set('model', result);
            });
            this.set('defaultSortingActiveClass', '');
            this.set('sortingByPopularityActiveClass', '');
            this.set('sortingBynewnessActiveClass', 'active');
            this.set('sortingByPriceActiveClass', '');
            this.set('selectedSorting', 'Sort by Newness');
            this.set('isSortingButtonActive', false);
          } else if (sortingType === 'price') {
            set(this.get('filters'), 'sortingType', 'highestBid');
            this.get('productHttp').filterProductsBySubcategory(this.get('filters')).then((result) => {
              this.set('model', result);
            });
            this.set('defaultSortingActiveClass', '');
            this.set('sortingBynewnessActiveClass', '');
            this.set('sortingByPopularityActiveClass', '');
            this.set('sortingByPriceActiveClass', 'active');
            this.set('selectedSorting', 'Sort by Price');
            this.set('isSortingButtonActive', false);
          } else if (sortingType === 'popularity') {
            set(this.get('filters'), 'sortingType', 'numberOfBids');
            this.get('productHttp').filterProductsBySubcategory(this.get('filters')).then((result) => {
              this.set('model', result);
            });
            this.set('defaultSortingActiveClass', '');
            this.set('sortingBynewnessActiveClass', '');
            this.set('sortingByPriceActiveClass', '');
            this.set('sortingByPopularityActiveClass', 'active');
            this.set('selectedSorting', 'Sort by Popularity');
            this.set('isSortingButtonActive', false);
          }
        },
        exploreMore() {
          this.set('pageSize', this.get('pageSize') + 9);
          set(this.get('filters'), 'pageSize', this.get('pageSize'));
          this.get('productHttp').filterProductsBySubcategory(this.get('filters')).then((result) => {
            this.set('model', result);
          });
        },
        setView() {
          if (this.get('isGridActive')) {
            this.set('isGridActive', false);
            this.set('isListActive', true);
            this.set('gridActive', '');
            this.set('listActive', 'active');
          } else if (this.get('isListActive')) {
            this.set('isListActive', false);
            this.set('isGridActive', true);
            this.set('listActive', '');
            this.set('gridActive', 'active');
          }
        },
        listSubcategories(category) {
          if (!this.get('isActiveCategory')[category]) {
            set(this.get('isActiveCategory'), category, true);
            set(this.get('categoryButtons'), category, '-');
            this.get('productHttp').getProductSubcategories(category).then((result) => {
              set(this.get('subcategories'), category, result);
            });
          } else {
            set(this.get('isActiveCategory'), category, false);
            set(this.get('categoryButtons'), category, '+');
          }
        }
      }
    });
