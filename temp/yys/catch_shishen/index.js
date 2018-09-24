const http = require('https');
const fs = require('fs');
const path = require('path');

const queryString = require('query-string');
const NP = require('number-precision');

const shishen = require('./shishen.js');
const jinengxiangqing = require('./jinengxiangqing.js');

// const root = path.join(__dirname, '');

// 式神技能请求url
const hero_skill_url = 'https://g37simulator.webapp.163.com/get_hero_skill';

// 式神数据请求url
const hero_attr_url = 'https://g37simulator.webapp.163.com/get_hero_attr';

// 式神技能请求参数
const hero_skill_data = {
	// heroid: 314,
	awake: 0,
	level: 0,
	star: 2
}

// 式神觉醒技能请求参数
const hero_awaken_skill_data = {
	// eroid: 314,
	awake: 1,
	level: 0,
	star: 2
}

// 式神属性请求参数
const hero_attr_data = {
	// heroid: 314,
	awake: 0,
	level: 1,
	star: 2
}
// 式神觉醒属性请求参数
const hero_awaken_attr_data = {
	// heroid: 314,
	awake: 1,
	level: 1,
	star: 2
}

let errIds = [];

const timestamp = (new Date()).getTime();

/**
 * 获取数据
 * @return {[type]} [description]
 */
function getData(id) {
	const defaultParam = {
		heroid: id,
		_: timestamp,
		callback: 'temp'
	}

	function parseData(data) {
		return JSON.parse(data.slice(defaultParam.callback.length+1, data.length-1))
	}

	const promise_hero_skill = new Promise((resolve, reject)=>{
		http.get(`${hero_skill_url}?${queryString.stringify({...hero_skill_data, ...defaultParam})}`, (res)=>{
			let content = '';

			res.on('data', (data)=>{
				content += data;
			});

			res.on('end', ()=>{
				content = parseData(content);
				
				if(content.success){
					resolve(content.data);
				}else{
					// reject(id);
					errIds.push(id)
				}
			})

		}).on('error', (err)=>{
			// console.log(id + ' 错误信息：' + err);
			// reject(id);
			errIds.push(id)
		});
	});

	const promise_hero_awaken_skill = new Promise((resolve, reject)=>{
		http.get(`${hero_skill_url}?${queryString.stringify({...hero_awaken_skill_data, ...defaultParam})}`, (res)=>{
			let content = '';

			res.on('data', (data)=>{
				content += data;
			});

			res.on('end', ()=>{
				content = parseData(content);
				
				if(content.success){
					resolve(content.data);
				}else{
					// reject(id);
					errIds.push(id)
				}
			})

		}).on('error', (err)=>{
			// console.log(id + ' 错误信息：' + err);
			// reject(id);
			errIds.push(id)
		});
	});

	const promise_hero_attr = new Promise((resolve, reject)=>{
		http.get(`${hero_attr_url}?${queryString.stringify({...hero_attr_data, ...defaultParam})}`, (res)=>{
			let content = '';

			res.on('data', (data)=>{
				content += data;
			});

			res.on('end', ()=>{
				content = parseData(content);
				
				if(content.success){
					resolve(content.data);
				}else{
					// reject(id);
					errIds.push(id)
				}
			})

		}).on('error', (err)=>{
			// console.log(id + ' 错误信息：' + err);
			// reject(id);
			errIds.push(id)
		});
	});

	const promise_hero_awaken_attr = new Promise((resolve, reject)=>{
		http.get(`${hero_attr_url}?${queryString.stringify({...hero_awaken_attr_data, ...defaultParam})}`, (res)=>{
			let content = '';

			res.on('data', (data)=>{
				content += data;
			});

			res.on('end', ()=>{
				content = parseData(content);
				
				if(content.success){
					resolve(content.data);
				}else{
					// reject(id);
					errIds.push(id)
				}
			})

		}).on('error', (err)=>{
			// console.log(id + ' 错误信息：' + err);
			// reject(id);
			errIds.push(id)
		});
	});

	return Promise.all([promise_hero_skill, promise_hero_awaken_skill, promise_hero_attr, promise_hero_awaken_attr]);
}

// shishen.data.map(item=>item.id).forEach((item)=>{
[{
	id: 315
}].map(item=>item.id).forEach((item)=>{
	let id = item;
	getData(id).then(([skill, awaken_skill, attr, awaken_attr])=>{
		// console.log(id);
		// console.log(attr);
		
		const data = createData(id, skill, awaken_skill, attr, awaken_attr);
// console.log(data);
		writeToFile(data);

	}).catch((errId)=>{
		if(errIds.length > 0){
			fs.writeFile('errlog_log.js', JSON.stringify(errIds), (err)=>{
				console.log('错误ID写入文件失败');
			})
		}
	});
});
// getData(100).then(([skill, awaken_skill, attr, awaken_attr])=>{
// 	console.log(attr);
// }).catch((errId)=>{
// 	console.log(errId);
// });

function writeToFile(data) {
	let content;
	try{
		content = JSON.stringify(data);
	}catch(e){}

	if(data.id){
		fs.writeFile(`./dist/${data.id}.js`, `module.exports = ${content}`, (err)=>{
			if(err){
				console.log('出错啦');
			}
			console.log(data.id+' 已保存到本地')
		})
	}else{
		console.log('id不存在');
	}
}

// 评级映射
const levelMap = ['D', 'C', 'B', 'A', 'S'];

function createData(id, skill, awaken_skill, attr, awaken_attr) {
	let baseData = shishen.getDataById(id);

	let objData = {
		id: id,
		name: baseData.name,
		properties: [
			{
				name: '攻击',
				base: {
					level: levelMap[attr.score.attack],
					value: attr.attack
				},
				awaken: {
					level: awaken_attr ? levelMap[awaken_attr.score.attack] : '',
					value: awaken_attr ? awaken_attr.attack : ''
				}
			},
			{
				name: '生命',
				base: {
					level: levelMap[attr.score.maxHp],
					value: attr.maxHp
				},
				awaken: {
					level: awaken_attr ? levelMap[awaken_attr.score.maxHp] : '',
					value: awaken_attr ? awaken_attr.maxHp : ''
				}
			},
			{
				name: '防御',
				base: {
					level: levelMap[attr.score.defense],
					value: attr.defense
				},
				awaken: {
					level: awaken_attr ? levelMap[awaken_attr.score.defense] : '',
					value: awaken_attr ? awaken_attr.defense : ''
				}
			},
			{
				name: '速度',
				base: {
					level: levelMap[attr.score.speed],
					value: attr.speed
				},
				awaken: {
					level: awaken_attr ? levelMap[awaken_attr.score.speed] : '',
					value: awaken_attr ? awaken_attr.speed : ''
				}
			},
			{
				name: '暴击',
				base: {
					level: levelMap[attr.score.critRate],
					value: attr.critRate > 0 ? NP.times(attr.critRate, 100)+'%' : '0%'
				},
				awaken: {
					level: awaken_attr ? levelMap[awaken_attr.score.critRate] : '',
					value: awaken_attr ? (awaken_attr.critRate > 0 ? NP.times(awaken_attr.critRate, 100)+'%' : '0%') : ''
				}
			},
			{
				name: '暴击伤害',
				base: {
					value: attr.critPower > 0 ? NP.times(NP.plus(attr.critPower, 1), 100)+'%' : '0%'
				},
				awaken: {
					value: awaken_attr ? (awaken_attr.critPower > 0 ? NP.times(NP.plus(awaken_attr.critPower, 1), 100)+'%' : '0%') : ''
				}
			},
			{
				name: '效果命中',
				base: {
					value: attr.debuffEnhance > 0 ? NP.times(attr.debuffEnhance, 100)+'%' : '0%'
				},
				awaken: {
					value: awaken_attr ? (awaken_attr.debuffEnhance > 0 ? NP.times(awaken_attr.debuffEnhance, 100)+'%' : '0%') : ''
				}
			},
			{
				name: '效果抵抗',
				base: {
					value: attr.debuffResist > 0 ? NP.times(attr.debuffResist, 100)+'%' : '0%'
				},
				awaken: {
					value: awaken_attr ? (awaken_attr.debuffResist > 0 ? NP.times(awaken_attr.debuffResist, 100)+'%' : '0%') : ''
				}
			}
		],
		skills: [1,2,3].map(function (item, index) {
			let skillId = id+''+item;
			let skillItem = skill[skillId];
			if(!skillItem){return ''};

			let baseDataSkill = (baseData.skills && baseData.skills[index]) || {};
			return {
				id: skillId,
				name: skillItem.name,
				cost: baseDataSkill.cost,
				talk: baseDataSkill.talk,
				type: baseDataSkill.type,
				desc: skillItem.normaldesc.replace(/『/g, '「').replace(/』/g, '」').split('\n'),
				upgrade: skillItem.desc.map(function (des) {
					return des.substr(4);
				}),
				detail: jinengxiangqing.getDetail(skillItem.normaldesc)
			}
		}).filter(function (item) {
			return !!item;
		}),
		awaken: {
			materials: awaken_attr ? awaken_attr.awakeitem.map(function (item) {
				return {
					name: item[0],
					count: item[2]
				}
			}) : [],
			effect: awaken_skill ? awaken_skill.add : ''
		}
	};
// console.log(objData.skills);
	// 缓存觉醒技能名称
	let temp_awaken_skill_name = '';
	let temp_awaken_effect = objData.awaken.effect;

	// 觉醒技能处理
	if(awaken_skill){

		if(awaken_skill.add_type == 2 || awaken_skill.add.indexOf('觉醒技能')>-1){
			objData.skills = objData.skills.map(function (item) {
				if(awaken_skill[item.id]){
					temp_awaken_skill_name = awaken_skill[item.id].name;

					item.desc = awaken_skill[item.id].normaldesc.replace(/『/g, '「').replace(/』/g, '」').split('\n');
					item.upgrade = awaken_skill[item.id].desc.map(function (des) {
						return des.substr(4);
					});
					item.detail = jinengxiangqing.getDetail(awaken_skill[item.id].normaldesc);
				}

				return item;
			});

			try{
				objData.awaken.effect = temp_awaken_effect.substr(0, 4) + '「'+ temp_awaken_skill_name +'」' + temp_awaken_effect.substr(4);
			}catch(e){}
		}else if(awaken_skill.add_type == 1 || awaken_skill.add.indexOf('觉醒添加')>-1){
			let newSkillId = [1,2,3].map(function (item, index) {
				let skillId = id+''+item;

				if(awaken_skill[skillId]){
					temp_awaken_skill_name = awaken_skill[skillId].name;
					return skillId;
				}else{
					return '';
				}
			}).filter(function (item) {
				return !!item;
			})[0];

			skill[newSkillId] = awaken_skill[newSkillId];
			
			objData.skills = [1,2,3].map(function (item, index) {
				let skillId = id+''+item;
				let skillItem = skill[skillId];
				if(!skillItem){return ''};

				let baseDataSkill = (baseData.skills && baseData.skills[index]) || {};
				return {
					id: skillId,
					name: skillItem.name,
					cost: baseDataSkill.cost,
					talk: baseDataSkill.talk,
					type: baseDataSkill.type,
					desc: skillItem.normaldesc.replace(/『/g, '「').replace(/』/g, '」').split('\n'),
					upgrade: skillItem.desc.map(function (des) {
						return des.substr(4);
					}),
					detail: jinengxiangqing.getDetail(skillItem.normaldesc)
				}
			}).filter(function (item) {
				return !!item;
			});

			try{
				objData.awaken.effect = temp_awaken_effect + '「'+ temp_awaken_skill_name +'」';
			}catch(e){}
			
		}

	}

	return objData;
}



// const  hero_skill_url = 'https://g37simulator.webapp.163.com/get_hero_skill?callback=temp&heroid=316&awake=1&level=0&star=2&_=1537357464127';

// http.get(hero_skill_url, (res)=>{
// 	let content = '';

// 	res.on('data', (data)=>{
// 		content += data;
// 	});

// 	res.on('end', ()=>{
// 	// console.log(JSON.parse(content.slice(5, content.length-1)).data);
// 		content = JSON.parse(content.slice(5, content.length-1)).data;
// 		fs.writeFile('./dist/316.js', 'module.exports = ' + JSON.stringify(content), (err)=>{
// 			if(err){
// 				console.log('出错啦');
// 			}
// 			console.log('已保存到本地')
// 		})
// 	})
// }).on('error', (err)=>{
// 	console.log('错误信息：' + err);
// })