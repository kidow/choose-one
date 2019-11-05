export const state = () => ({
  comments: [
    {
      id: 1,
      parentId: null,
      likes: 11,
      displayName: 'Kim',
      createdAt: new Date(),
      content:
        'i can still have a great personality without being funny....i can still be smart, opinionated, and good willed...i don'
    },
    {
      id: 2,
      parentId: 1,
      likes: 11,
      displayName: 'Arnold',
      createdAt: new Date(),
      content:
        "Man... I'm bored just reading your post.. maybe go for the funny part."
    },
    {
      id: 3,
      parentId: 1,
      likes: 11,
      displayName: 'Arnold',
      createdAt: new Date(),
      content:
        "Man... I'm bored just reading your post.. maybe go for the funny part."
    },
    {
      id: 4,
      parentId: 1,
      likes: 11,
      displayName: 'Arnold',
      createdAt: new Date(),
      content:
        "Man... I'm bored just reading your post.. maybe go for the funny part."
    }
  ],
  visible: false,
  postId: ''
})

export const getters = {
  GET_COMMENTS: state => state.comments,
  GET_VISIBLE: state => state.visible,
  GET_POST_ID: state => state.postId
}

export const mutations = {
  SAVE_COMMENTS(state, comments) {
    state.comments = [...state.comments, comments]
  },
  SAVE_VISIBLE(state, visible) {
    state.visible = visible
  },
  SAVE_POST_ID(state, postId) {
    state.postId = postId
  }
}

export const actions = {}
