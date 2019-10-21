export const state = () => ({
  comment: '',
  comments: [
    {
      id: 1,
      parentId: null,
      likes: 11,
      imgUrl:
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      name: 'Kim',
      createdAt: new Date(),
      content:
        'i can still have a great personality without being funny....i can still be smart, opinionated, and good willed...i don'
    },
    {
      id: 2,
      parentId: 1,
      likes: 11,
      imgUrl: '',
      name: 'Arnold',
      createdAt: new Date(),
      content:
        "Man... I'm bored just reading your post.. maybe go for the funny part."
    },
    {
      id: 3,
      parentId: 1,
      likes: 11,
      imgUrl: '',
      name: 'Arnold',
      createdAt: new Date(),
      content:
        "Man... I'm bored just reading your post.. maybe go for the funny part."
    },
    {
      id: 4,
      parentId: 1,
      likes: 11,
      imgUrl: '',
      name: 'Arnold',
      createdAt: new Date(),
      content:
        "Man... I'm bored just reading your post.. maybe go for the funny part."
    }
  ],
  visible: false
})

export const getters = {
  GET_COMMENTS: state => state.comments,
  GET_VISIBLE: state => state.visible
}

export const mutations = {
  SAVE_COMMENTS(state, comments) {
    state.comments = comments
  },
  SAVE_VISIBLE(state, visible) {
    state.visible = visible
  }
}

export const actions = {}
