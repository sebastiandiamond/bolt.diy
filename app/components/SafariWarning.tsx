export default function SafariWarning() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bolt-elements-bg-depth-1 z-50">
      <div className="bg-bolt-elements-bg-depth-2 p-8 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-xl font-semibold text-bolt-elements-textPrimary mb-4">Browser Not Supported</h2>
        <p className="text-bolt-elements-textSecondary mb-6">
          Safari is currently not supported. Please use Google Chrome for the best experience.
        </p>
        <a
          href="https://www.google.com/chrome"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-bolt-elements-button-primary-background text-bolt-elements-button-primary-text px-6 py-2 rounded-lg hover:bg-bolt-elements-button-primary-backgroundHover transition-colors"
        >
          Download Chrome
        </a>
      </div>
    </div>
  );
} 