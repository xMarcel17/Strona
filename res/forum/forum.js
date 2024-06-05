// Funkcja do ładowania danych profilu z localStorage
var username_temp;

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
  
  username_temp = profileData.username;
  // Aktualizacja danych w navbarze
  document.getElementById('nav_username').textContent = profileData.username;
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




function getCurrentUsername() {
  // Tutaj możesz zaimplementować sposób pobierania nazwy użytkownika, np. z sesji lub lokalnego przechowywania
  // Zakładając, że masz już funkcję do pobierania aktualnej nazwy użytkownika, zwróć ją tutaj
  return username_temp; // Na potrzeby przykładu zwrócimy stałą nazwę
}

function getCurrentDateTime() {
  const now = new Date();
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return now.toLocaleDateString('pl-PL', options);
}


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
      threadElement.classList.add('thread-item');
      threadElement.innerHTML = `
          <p class="thread-author">Autor: ${thread.username}</p>
          <p class="thread-date">Data dodania: ${thread.datetime}</p>
          <a href="thread.html?threadId=${thread.id}">${thread.title}</a>
          <button onclick="deleteThread(${thread.id})">Usuń</button>
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
    username: getCurrentUsername(),
    datetime: getCurrentDateTime(),
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
      postElement.classList.add('post-item');
      postElement.innerHTML = `
          <p class="post-author">Autor: ${post.username}</p>
          <p class="post-date">Data dodania: ${post.datetime}</p>
          <p>${post.content}</p>
          <button onclick="deletePost(${thread.id}, ${post.id})">Usuń</button>
      `;
      forumPosts.appendChild(postElement);
  });

  const newPostContainer = document.getElementById('new-post-container');
  newPostContainer.innerHTML = `
      <textarea id="new-post-content" class="new-post-content" placeholder="Wpisz swoją odpowiedź..."></textarea>
      <button onclick="addPost()" class="btn">Dodaj odpowiedź</button>
  `;
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
    username: getCurrentUsername(),
    datetime: getCurrentDateTime(),
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
