import { ref, computed, watch, onMounted } from 'vue'

export function useVideos() {
  const videos = ref([])
  const searchQuery = ref('')
  const totalLikes = ref(0)
  const isLoading = ref(false)
  const isDarkTheme = ref(false)
  const isSorted = ref(false)

  const mockVideos = [
    {
      id: 1,
      title: 'Песня про вью',
      channel: 'Альбомы для айти',
      views: '67K',
      thumbnail: 'https://picsum.photos/300/200?random=1',
      likes: 0
    },
    {
      id: 2,
      title: 'Дорога в аэропорт клип',
      channel: 'Тимати Шаламе',
      views: '125K',
      thumbnail: 'https://picsum.photos/300/200?random=2',
      likes: 0
    },
    {
      id: 3,
      title: 'Сдепой человек все еще слепой но чуть чуть начинает видеть',
      channel: 'Мистер Бист',
      views: '89K',
      thumbnail: 'https://picsum.photos/300/200?random=3',
      likes: 0
    },
  ]

  const filteredVideos = computed(() => {
    let result = videos.value
    
    if (searchQuery.value) {
      result = result.filter(video => 
        video.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }
    
    if (isSorted.value) {
      result = [...result].sort((a, b) => {
        const viewsA = parseInt(a.views.replace('K', ''))
        const viewsB = parseInt(b.views.replace('K', ''))
        return viewsB - viewsA
      })
    }
    
    return result
  })

  const videosFound = computed(() => filteredVideos.value.length)

  const handleLike = (videoTitle) => {
    const video = videos.value.find(v => v.title === videoTitle)
    if (video) {
      video.likes += 1
      totalLikes.value += 1
    }
  }

  const toggleSortByViews = () => {
    isSorted.value = !isSorted.value
  }

  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value
  }

  watch(searchQuery, (newQuery) => {
    console.log('Поисковый запрос изменился:', newQuery)
  })

  onMounted(() => {
    isLoading.value = true
    setTimeout(() => {
      videos.value = [...mockVideos]
      isLoading.value = false
    }, 1000)
  })

  return {
    videos,
    searchQuery,
    totalLikes,
    isLoading,
    isDarkTheme,
    isSorted,
    
    filteredVideos,
    videosFound,
    
    handleLike,
    toggleSortByViews,
    toggleTheme
  }
}
