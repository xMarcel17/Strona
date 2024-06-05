// Funkcja do ładowania danych profilu z localStorage
function loadProfileData() {
  const profileData = JSON.parse(localStorage.getItem('profileData')) || {
      firstName: 'Jan',
      lastName: 'Kowalski',
      username: 'kochamChoinki7349',
      email: 'j.kowalski7349@gmail.com',
      phone: '52******',
      card: '1234************23',
      address: 'ul. Grottgera 24/6'
  };

  // Aktualizacja danych w navbarze
  const navUsername = document.getElementById('nav_username');
  navUsername.textContent = profileData.username;
  navUsername.classList.add('nav-username'); // Dodajemy klasę CSS
}

// Funkcja do zapisywania danych profilu do localStorage
function saveProfileData() {
  const profileData = {
      firstName: document.getElementById('editFirstName').value,
      lastName: document.getElementById('editLastName').value,
      username: document.getElementById('editUsername').value,
      email: document.getElementById('editEmail').value,
      phone: document.getElementById('editPhone').value,
      card: document.getElementById('editCard').value,
      address: document.getElementById('editAddress').value
  };

  localStorage.setItem('profileData', JSON.stringify(profileData));
}

// Event Listener, aby załadować dane profilu po załadowaniu strony
document.addEventListener("DOMContentLoaded", () => {
  loadProfileData();
});

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('forum.html')) {
      loadForumStyles();
      loadThreads();
  } else if (window.location.pathname.includes('thread.html')) {
      loadThreadStyles();
      loadThread();
  }
});

function loadForumStyles() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = '../res/forum/forum.css';
  document.head.appendChild(link);
}

function loadThreadStyles() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = '../res/forum/thread.css';
  document.head.appendChild(link);
}

function loadThreads() {
  const threads = JSON.parse(localStorage.getItem('threads')) || [];
  const forumThreads = document.getElementById('forum-threads');
  forumThreads.innerHTML = '';

  threads.forEach(thread => {
      const threadElement = document.createElement('div');
      threadElement.classList.add('thread-item'); // Dodajemy klasę CSS
      threadElement.innerHTML = `
          <a href="thread.html?threadId=${thread.id}" class="thread-link">${thread.title}</a>
          <button class="delete-button" onclick="deleteThread(${thread.id})">Usuń</button>
      `;
      forumThreads.appendChild(threadElement);
  });
}

function createThread() {
  const threadTitle = prompt('Podaj tytuł wątku:');
  if (!threadTitle) return;

  const threads = JSON.parse(localStorage.getItem('threads')) || [];
  const newThread = {
      id: Date.now(),
      title: threadTitle,
      posts: []
  };
  threads.push(newThread);
  localStorage.setItem('threads', JSON.stringify(threads));
  loadThreads();
}

function deleteThread(threadId) {
  if (!confirm('Czy na pewno chcesz usunąć ten wątek?')) return;

  let threads = JSON.parse(localStorage.getItem('threads')) || [];
  threads = threads.filter(thread => thread.id !== threadId);
  localStorage.setItem('threads', JSON.stringify(threads));
  loadThreads();
}

function loadThread() {
  const params = new URLSearchParams(window.location.search);
  const threadId = params.get('threadId');
  const threads = JSON.parse(localStorage.getItem('threads')) || [];
  const thread = threads.find(t => t.id == threadId);

  if (!thread) {
      alert('Wątek nie znaleziony');
      window.location.href = 'forum.html';
      return;
  }

  document.getElementById('thread-title').textContent = thread.title;

  const forumPosts = document.getElementById('forum-posts');
  forumPosts.innerHTML = '';
  thread.posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post-item'); // Dodajemy klasę CSS
      postElement.innerHTML = `
          <p>${post.content}</p>
          <button class="delete-button" onclick="deletePost(${thread.id}, ${post.id})">Usuń</button>
      `;
      forumPosts.appendChild(postElement);
  });
}

function addPost() {
  const params = new URLSearchParams(window.location.search);
  const threadId = params.get('threadId');
  const threads = JSON.parse(localStorage.getItem('threads')) || [];
  const thread = threads.find(t => t.id == threadId);

  if (!thread) {
      alert('Wątek nie znaleziony');
      return;
  }

  const newPostContent = document.getElementById('new-post-content').value;
  if (!newPostContent) return;

  const newPost = {
      id: Date.now(),
      content: newPostContent
  };
  thread.posts.push(newPost);
  localStorage.setItem('threads', JSON.stringify(threads));
  loadThread();
}

function deletePost(threadId, postId) {
  if (!confirm('Czy na pewno chcesz usunąć ten post?')) return;

  let threads = JSON.parse(localStorage.getItem('threads')) || [];
  const threadIndex = threads.findIndex(t => t.id == threadId);
  if (threadIndex !== -1) {
      threads[threadIndex].posts = threads[threadIndex].posts.filter(post => post.id !== postId);
      localStorage.setItem('threads', JSON.stringify(threads));
      loadThread();
  }
}
