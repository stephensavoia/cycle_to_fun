import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  return [
    ...parentMeta,
    { title: "Cookie Policy | Cycle TO Fun" },
    {
      name: "description",
      content:
        'Cookies are small text files that are placed on your device to help the Site provide a better user experience. Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device for a set period or until you delete them, while session cookies are deleted once you close your web browser.',
    },
    { name: "og:url", content: "https://www.cycletofun.com/cookie-policy" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: "Cookie Policy | Cycle TO Fun" },
    {
      name: "og:description",
      content:
        'Cookies are small text files that are placed on your device to help the Site provide a better user experience. Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device for a set period or until you delete them, while session cookies are deleted once you close your web browser.',
    },
    {
      name: "og:image",
      content: "https://www.cycletofun.com/img/og-image.jpg",
    },
  ];
};

export default function CookiePolicy() {
  return (
    <div className="main-container max-w-[480px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p>
          Cycle TO Fun ("we," "us," or "our") uses cookies on{" "}
          <a className="link" href="https://www.cycletofun.ca">
            https://www.cycletofun.ca
          </a>{" "}
          (the "Site"). By using the Site, you consent to the use of cookies.
          This Cookie Policy explains what cookies are, how we use them, and
          your choices regarding cookies.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. What are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your device to help
          the Site provide a better user experience. Cookies can be "persistent"
          or "session" cookies. Persistent cookies remain on your device for a
          set period or until you delete them, while session cookies are deleted
          once you close your web browser.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Cookies</h2>
        <p>
          We use cookies for a variety of reasons detailed below. Unfortunately,
          in most cases, there are no industry-standard options for disabling
          cookies without completely disabling the functionality and features
          they add to this site. It is recommended that you leave on all cookies
          if you are not sure whether you need them or not.
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Essential Cookies:</strong> These cookies are necessary for
            the Site to function correctly. They enable you to navigate the Site
            and use its features.
          </li>
          <li>
            <strong>Performance Cookies:</strong> These cookies collect
            information about how you use the Site, such as which pages you
            visit most often. This data is used to improve the Site's
            performance.
          </li>
          <li>
            <strong>Functionality Cookies:</strong> These cookies allow the Site
            to remember choices you make and provide enhanced, more personalized
            features.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> We use these cookies to track
            information about how the Site is used so that we can make
            improvements. We may also use third-party analytics tools that use
            cookies to collect and report this information.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          4. Your Choices Regarding Cookies
        </h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You
          can exercise your cookie preferences by adjusting your browser
          settings. Please note that disabling cookies may affect the
          functionality of the Site.
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Browser Controls:</strong> You can set or amend your web
            browser controls to accept or refuse cookies. If you choose to
            reject cookies, you may still use our Site, though your access to
            some functionality and areas of our Site may be restricted.
          </li>
          <li>
            <strong>Opt-Out Links:</strong> You can opt out of targeted
            advertising by using opt-out links provided by third-party
            advertisers.
          </li>
          <li>
            <strong>Do Not Track:</strong> Some browsers offer a “Do Not Track”
            feature that lets you inform websites that you do not want your
            online activities tracked. These features are not yet uniform, so
            our Site may not currently respond to those signals.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          5. Changes to This Cookie Policy
        </h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes
          to our practices or for other operational, legal, or regulatory
          reasons. You are advised to review this Cookie Policy periodically for
          any changes. Changes to this Cookie Policy are effective when they are
          posted on this page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
        <p>
          If you have any questions about this Cookie Policy, please contact us
          at{" "}
          <a className="link" href="mailto:cycletofun@gmail.com">
            cycletofun@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
