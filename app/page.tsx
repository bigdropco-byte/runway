import { redirect } from 'next/navigation';

export const dynamic = 'force-static';

export default function RootPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-slate-700 bg-white">
      {/* Instant meta-refresh redirect to default English */}
      <meta httpEquiv="refresh" content="0;url=/en/" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              var lang = (navigator.language || 'en').split('-')[0].toLowerCase();
              var supported = ['en', 'es', 'fr', 'de', 'pt', 'it', 'hi', 'mr', 'bn', 'ar', 'ru', 'ja', 'ko', 'zh', 'tr', 'id', 'nl', 'pl', 'sv', 'da', 'fi', 'no', 'cs', 'el', 'he', 'fa', 'ur'];
              var target = supported.indexOf(lang) !== -1 ? lang : 'en';
              window.location.replace('/' + target + '/');
            } catch(e) {
              window.location.replace('/en/');
            }
          `
        }}
      />
      <div className="text-center space-y-4 max-w-sm">
        <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <h1 className="text-base font-bold text-slate-900">Runway Calculator</h1>
        <p className="text-xs text-slate-500">
          Redirecting to your localized calculator experience...
        </p>
        <p className="text-xs">
          <a href="/en/" className="text-indigo-600 font-semibold underline">
            Click here if you are not redirected automatically
          </a>
        </p>
      </div>
    </div>
  );
}
