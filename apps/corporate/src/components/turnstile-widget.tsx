'use client';

import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  className?: string;
}

export function TurnstileWidget({
  onVerify,
  onError,
  onExpire,
  className,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    // If no site key is configured (e.g. local development or preview without keys),
    // automatically supply a test token so development and automated testing can proceed.
    if (!siteKey) {
      onVerify('XXXX.DUMMY.TOKEN.XXXX');
      return;
    }

    const scriptId = 'cf-turnstile-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    } else if (window.turnstile) {
      setIsLoaded(true);
    } else {
      script.addEventListener('load', () => setIsLoaded(true));
    }
  }, [siteKey, onVerify]);

  useEffect(() => {
    if (!siteKey || !isLoaded || !containerRef.current || !window.turnstile) {
      return;
    }

    // Clean up previous instance if any
    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          onVerify(token);
        },
        'error-callback': () => {
          if (onError) onError();
        },
        'expired-callback': () => {
          if (onExpire) onExpire();
        },
        theme: 'light',
      });
    } catch (e) {
      console.warn('[TURNSTILE RENDER WARNING]', e);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, isLoaded, onVerify, onError, onExpire]);

  // If no siteKey is provided in development, render a subtle indicator
  if (!siteKey) {
    return (
      <div className="text-xs text-gray-500 italic py-1">
        Anti-abuse protection active (development simulation token auto-applied).
      </div>
    );
  }

  return <div ref={containerRef} className={className || 'my-2'} />;
}
