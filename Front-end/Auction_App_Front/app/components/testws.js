import Component from '@ember/component';
import { inject as service } from '@ember/service';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Component.extend(FindQuery, {
	store: service(),
	articles: null,
    init() {
      this._super();
    },
    actions: {
      sendButtonPressed() {
      	this.set('articles', this.store.findAll('article'))
      	let self = this;
      	this.filterEqual(this.store, 'article', {'title': 'harisss'}, function(post) {
      		if (post[0] == null) {
				var articles = self.store.createRecord('article',{
				  title: 'harisss'
				});
				articles.save();
      		}else {
      			console.log(post[0].title)
      			      		post[0].set('title', 'mujo')
      		console.log(post[0].title)
      		post[0].save();
      		}
      		

		});
		
      }
    }

});
