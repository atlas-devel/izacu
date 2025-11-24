// Count new visitor
if (!localStorage.getItem("izacu_new_visitor")) {
  localStorage.setItem("izacu_new_visitor", "true");

  // Tell backend to increment newVisitor
  fetch("/api/analytics/new-visitor", { method: "POST" });
}

// Count page view once per session
if (!sessionStorage.getItem("izacu_page_viewed")) {
  sessionStorage.setItem("izacu_page_viewed", "true");

  // Tell backend to increment pageViews
  fetch("/api/analytics/page-view", { method: "POST" });
}
