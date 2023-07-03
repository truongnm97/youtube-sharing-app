import './App.css'
import { useState } from 'react'
import { Card, Pagination, Popup } from './components'
import { useSignIn, useSignOut, useGetMe, useSignUp } from './api'
import { useCreatePost, useGetPosts } from './api/post'
import { toast } from 'react-toastify'
import { formatErrorMessage } from './utils'

function App() {
  const [page, setPage] = useState(1)
  const [pageSize, _setPageSize] = useState(10)
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [youtubeURL, setYoutubeURL] = useState('')
  const { data: user, isSuccess: isAuthenticated } = useGetMe()
  const { mutate: signIn } = useSignIn({
    onError: (data) => {
      const message = formatErrorMessage(data.response?.data.message)
      toast(message)
    },
  })
  const { mutate: signUp } = useSignUp({
    onSuccess: () => {
      toast('Create User Successfully!!!')
      signIn({
        email,
        password,
      })
    },
    onError: (data) => {
      const message = formatErrorMessage(data.response?.data.message)

      if (data.response?.status === 403 && message === 'Credential taken') {
        signIn({
          email,
          password,
        })
      } else {
        toast(message)
      }
    },
  })
  const { mutate: signOut } = useSignOut()
  const { data: posts, refetch: refetchPosts } = useGetPosts(page, pageSize)
  const { mutate: createPost } = useCreatePost({
    onSuccess: () => {
      refetchPosts()
      handleCloseDialog()
    },
    onError: (data) => {
      const message = formatErrorMessage(data.response?.data.message)
      toast(message)
    },
  })

  const handleLogin = () => {
    signUp({
      email,
      password,
    })
  }

  const handleLogout = () => {
    signOut({})
  }

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setYoutubeURL('')
  }

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleChangeYoutubeURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeURL(e.target.value)
  }

  const handleSubmitURL = () => {
    if (!youtubeURL) return

    createPost({
      url: youtubeURL,
    })
  }

  return (
    <>
      <header>
        <a href='/' className='logo'>
          <img src='logo.png' alt='Logo' />
          <p>Youtube Sharing</p>
        </a>
        <div className='auth-section'>
          {isAuthenticated ? (
            <>
              <p>Welcome, {user.data.email}</p>
              <button onClick={handleOpenDialog}>Share a movie</button>
              <button className='danger' onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <input placeholder='email' value={email} onChange={handleChangeEmail} />
              <input
                type='password'
                placeholder='password'
                value={password}
                onChange={handleChangePassword}
              />
              <button onClick={handleLogin}>Login / Register</button>
            </>
          )}
        </div>
      </header>
      <section className='videos'>
        {posts?.data.total === 0 ? (
          <h2>Empty!!!</h2>
        ) : (
          posts?.data.data.map((post) => (
            <Card key={post.id} author={post.user.email} youtubeId={post.youtubeId} />
          ))
        )}
      </section>
      {posts && posts?.data.total > 0 && (
        <Pagination
          currentPage={page}
          pageSize={pageSize}
          total={posts.data.total}
          onPageChange={handlePageChange}
        />
      )}
      <Popup
        title='Share a Youtube video'
        open={open}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitURL}>
        <div className='dialog-input'>
          <p>Youtube URL</p>
          <input value={youtubeURL} onChange={handleChangeYoutubeURL} />
        </div>
      </Popup>
    </>
  )
}

export default App
