import type { ReactNode } from "react";

export type CaseLink = {
  label: string;
  href: string;
  variant: "ember" | "muted";
  /** "github" renders the GitHub mark, otherwise an up-right arrow. */
  icon: "arrow" | "github";
};

export type CaseBadge = { href: string; img: string; alt: string };

export type CaseStudy = {
  slug: string;
  title: string;
  year: string;
  tagline: string;
  active: boolean;
  lead: ReactNode;
  links: CaseLink[];
  badges?: CaseBadge[];
  /** ATS Screener's bespoke metric row. */
  metrics?: "ats";
  /** Browser-chrome address label on the hero screenshot, if any. */
  browserLabel?: string;
  /** object-position class for the hero screenshot. Default object-top. */
  objectClass?: string;
  /** Optional "team" note rendered in the sidebar. */
  team?: string;
  image: string;
  alt: string;
  body: ReactNode[];
  highlights: ReactNode[];
  builtWith: string[];
  cite?: {
    apa: string;
    bibtex: string;
    doi: { label: string; href: string };
    orcid: string;
  };
  next: { slug: string; title: string };
};

const Em = (s: string) => (
  <em className="font-medium not-italic text-ember">{s}</em>
);

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "cat-net": {
    slug: "cat-net",
    title: "CAT-Net",
    year: "2025",
    tagline: "97% accuracy ECG arrhythmia classifier",
    active: true,
    lead: (
      <>
        A hybrid deep-learning architecture combining CNNs, attention mechanisms,
        and transformer blocks to classify cardiac arrhythmias from ECG signals
        with 97% accuracy — trained and validated on the MIT-BIH dataset.
      </>
    ),
    links: [
      {
        label: "Source",
        href: "https://github.com/ChinmayaBJ/cat-net",
        variant: "ember",
        icon: "github",
      },
      {
        label: "Colab Notebook",
        href: "https://colab.research.google.com/drive/1ppb72S9oLWh7UGpoLd56jJe3LlRw2704",
        variant: "muted",
        icon: "arrow",
      },
    ],
    image: "/assets/shots/cat-net.png",
    alt: "CAT-Net ECG classifier screenshot",
    objectClass: "object-top",
    body: [
      <p key="c1">
        ECG arrhythmia classification is a sequence problem where the signal
        carries both local morphological features and long-range temporal
        dependencies. CAT-Net addresses both simultaneously with a{" "}
        {Em("three-stage architecture")}: a 1D CNN front-end for local feature
        extraction, a multi-head self-attention layer to weight diagnostically
        relevant intervals, and a transformer encoder to capture global rhythm
        context across the full beat sequence.
      </p>,
      <p key="c2">
        Trained on the MIT-BIH Arrhythmia Database (48 records, ~110,000
        annotated beats), the model classifies five rhythm classes (Normal, LBBB,
        RBBB, PVC, APC) and achieves {Em("97% overall accuracy")} with an F1
        score of 0.96 on the held-out test split. Preprocessing includes Pan-Tompkins
        R-peak detection, fixed-window segmentation, and per-sample Z-score
        normalization to handle signal amplitude variance across patients and
        recording equipment.
      </p>,
      <p key="c3">
        The attention mechanism proved critical: ablations removing it reduced
        accuracy by ~3.2 pp and hurt PVC recall most, confirming that the model
        learns to weight the ST-segment and T-wave features a cardiologist would
        focus on rather than memorizing waveform shape alone. The transformer
        stage contributed an additional 1.8 pp by catching inter-beat rhythm
        patterns invisible to a purely local classifier.
      </p>,
    ],
    highlights: [
      <>97% overall accuracy on MIT-BIH Arrhythmia Database, 5-class classification</>,
      <>
        Hybrid CNN + multi-head attention + transformer encoder — each stage
        addresses a distinct signal property
      </>,
      <>
        Pan-Tompkins R-peak detection and per-sample Z-score normalization for
        patient-agnostic generalization
      </>,
      <>
        Ablation study confirms attention learns clinically meaningful ECG
        features, not waveform shortcuts
      </>,
      <>F1 of 0.96 on held-out test split; PVC and APC classes included</>,
    ],
    builtWith: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "NumPy",
      "MIT-BIH Dataset",
      "Pan-Tompkins",
    ],
    next: { slug: "brightside", title: "BrightSide" },
  },

  brightside: {
    slug: "brightside",
    title: "BrightSide",
    year: "2025",
    tagline: "AI debate coaching with emotional intelligence",
    active: true,
    lead: (
      <>
        An AI-powered debate coaching platform that combines BERT-based argument
        analysis, GPT-driven rebuttal generation, and an emotional intelligence
        layer for real-time tone and sentiment feedback — published as an IEEE
        research paper in November 2025.
      </>
    ),
    links: [
      {
        label: "Source",
        href: "https://github.com/ChinmayaBJ/brightside",
        variant: "ember",
        icon: "github",
      },
    ],
    image: "/assets/shots/brightside.jpg",
    alt: "BrightSide platform screenshot",
    objectClass: "object-top",
    body: [
      <p key="b1">
        Debate coaching at scale has a fundamental problem: it requires an expert
        evaluator present in real time. BrightSide replaces that bottleneck with
        a multi-model NLP pipeline that evaluates{" "}
        {Em("argument structure, logical coherence, and emotional tone")} simultaneously
        — giving feedback that a single human coach could not deliver at the
        granularity or speed a debater needs mid-round.
      </p>,
      <p key="b2">
        The architecture layers three models: a fine-tuned BERT encoder classifies
        argument type and detects logical fallacies in real time as the debater
        speaks; a GPT-based module generates contextual rebuttal suggestions
        grounded in the opponent&apos;s most recent argument; and a sentiment +
        arousal model from HuggingFace provides emotional-state tracking so the
        platform can flag when delivery is undermining content.
      </p>,
      <p key="b3">
        Evaluated across multiple debate formats (British Parliamentary, Oxford
        style, competitive policy), the system achieves strong inter-annotator
        agreement with expert human judges on argument quality scoring, and the
        IEEE paper proposes a{" "}
        {Em("multi-signal scoring framework")} that separates logical quality from
        rhetorical effectiveness — a distinction most automated evaluation systems
        collapse into a single score.
      </p>,
    ],
    highlights: [
      <>
        Fine-tuned BERT for real-time argument type classification and fallacy
        detection
      </>,
      <>GPT-driven rebuttal generation grounded in opponent argument context</>,
      <>
        Emotional intelligence layer (sentiment + arousal) provides tone
        feedback alongside content analysis
      </>,
      <>
        Multi-signal scoring framework published in IEEE (Nov 2025) separating
        logical and rhetorical quality
      </>,
      <>Evaluated across British Parliamentary, Oxford, and policy debate formats</>,
    ],
    builtWith: [
      "Python",
      "BERT",
      "GPT",
      "HuggingFace Transformers",
      "spaCy",
      "NLTK",
      "Flask",
      "React",
    ],
    next: { slug: "h2-leak", title: "H2 Leak Detector" },
  },

  "h2-leak": {
    slug: "h2-leak",
    title: "H2 Leak Detector",
    year: "2024",
    tagline: "ML pipeline for hydrogen leak anomaly detection",
    active: true,
    lead: (
      <>
        A production-grade ML pipeline for hydrogen leak detection in industrial
        sensor data, combining LSTM-based time-series forecasting with Isolation
        Forest anomaly detection — achieving R² of 0.996 and a recall of 0.94 on
        real sensor test sets.
      </>
    ),
    links: [
      {
        label: "Source",
        href: "https://github.com/ChinmayaBJ/h2-leak-detector",
        variant: "ember",
        icon: "github",
      },
      {
        label: "Colab Notebook",
        href: "https://colab.research.google.com/drive/1AkHdBWzX-5ck_BSfR0W4rFfcLS9A8dLp",
        variant: "muted",
        icon: "arrow",
      },
    ],
    image: "/assets/shots/h2-leak.png",
    alt: "H2 Leak Detector screenshot",
    objectClass: "object-top",
    body: [
      <p key="h1">
        Hydrogen leaks in industrial settings are dangerous and expensive — but
        traditional threshold-based detectors have poor recall on slow leaks and
        high false-positive rates when sensor noise spikes. The H2 Leak Detector
        replaces hard thresholds with an{" "}
        {Em("ensemble of learned models")} that understands normal sensor
        behaviour before flagging deviations.
      </p>,
      <p key="h2">
        The pipeline has two stages. An LSTM network trained on multivariate
        sensor time-series (pressure, temperature, flow rate, H2 concentration)
        predicts expected next-window readings with an R² of 0.996. Residuals
        between predicted and actual readings are then fed to an Isolation Forest,
        which distinguishes genuine anomalous patterns from sensor noise by
        isolating outliers in residual feature space rather than in raw sensor space.
      </p>,
      <p key="h3">
        On a held-out test set of real sensor recordings including both simulated
        and recorded leak events, the system achieves{" "}
        {Em("0.94 recall and 0.91 precision")} — a substantial improvement over
        the 0.73 recall of the baseline threshold approach, with only a minor
        increase in false positives. The pipeline is containerized for edge
        deployment on industrial monitoring hardware with latency under 200ms per
        inference window.
      </p>,
    ],
    highlights: [
      <>LSTM forecasting on multivariate sensor data: R² of 0.996 on test set</>,
      <>
        Isolation Forest on LSTM residuals separates genuine leak anomalies from
        sensor noise
      </>,
      <>0.94 recall vs. 0.73 for threshold baseline; 0.91 precision</>,
      <>
        Containerized for edge deployment on industrial hardware; under 200ms
        per inference window
      </>,
      <>
        Multivariate inputs: pressure, temperature, flow rate, H₂ concentration
        channels
      </>,
    ],
    builtWith: [
      "Python",
      "TensorFlow",
      "scikit-learn",
      "LSTM",
      "Isolation Forest",
      "NumPy",
      "pandas",
      "Docker",
    ],
    next: { slug: "audio-fingerprinting", title: "Mantra Fingerprinter" },
  },

  "audio-fingerprinting": {
    slug: "audio-fingerprinting",
    title: "Mantra Fingerprinter",
    year: "2024",
    tagline: "Real-time audio fingerprinting for sung mantras",
    active: false,
    lead: (
      <>
        A real-time audio fingerprinting system that identifies and verifies
        sung mantras by converting each recording into a compact spectral
        signature — robust to shifts in pitch, tempo, and vocal character, and
        resilient to background noise and overlapping sound. Published research
        at R.V. College of Engineering.
      </>
    ),
    links: [
      {
        label: "Source",
        href: "https://github.com/ChinmayaBJ",
        variant: "ember",
        icon: "github",
      },
    ],
    image: "/assets/shots/audio-fingerprinting.png",
    alt: "Mantra fingerprinting spectrogram — time versus frequency",
    objectClass: "object-center",
    body: [
      <p key="a1">
        Recognizing a sung mantra is harder than matching a studio track: the
        same mantra varies in {Em("pitch, tempo, and vocal timbre")} every time
        it is chanted, and recordings arrive with ambient noise and overlapping
        voices. A naive waveform or exact-match approach collapses under this
        variability. The fingerprinter instead reduces each clip to a compact,
        noise-tolerant representation that survives these transformations.
      </p>,
      <p key="a2">
        The pipeline converts audio into a {Em("time–frequency spectrogram")},
        extracts spectral peak constellations that are stable under pitch and
        speed changes, and hashes them into a compact fingerprint. Query
        fingerprints are matched against a reference database using a
        time-offset voting scheme, so a correct match accumulates aligned peak
        pairs even when the chant is faster, slower, or in a different key.
      </p>,
      <p key="a3">
        Because the fingerprint keys on relative peak structure rather than
        absolute frequency, the system stays accurate across singers and
        recording conditions, and tolerates partial overlap with other audio.
        The work was carried out and published as research at R.V. College of
        Engineering.
      </p>,
    ],
    highlights: [
      <>Spectral peak-constellation fingerprints robust to pitch and tempo shifts</>,
      <>Time-offset voting match scheme tolerant of noise and overlapping audio</>,
      <>Compact hashed signatures enable fast matching against a reference database</>,
      <>Accurate across different singers and recording conditions</>,
      <>Published research — R.V. College of Engineering</>,
    ],
    builtWith: [
      "Python",
      "NumPy",
      "SciPy",
      "librosa",
      "Spectrogram Analysis",
      "DSP",
    ],
    next: { slug: "sap-agent-catalog", title: "SAP Agent Catalog" },
  },

  "sap-agent-catalog": {
    slug: "sap-agent-catalog",
    title: "SAP Agent Catalog",
    year: "2026",
    tagline: "60+ governed AI agents on SAP BTP Cloud Foundry",
    active: true,
    lead: (
      <>
        An automated AI agent catalog built on SAP BTP Cloud Foundry that
        replaced a manual SharePoint workflow — adding semantic search, approval
        workflows, and a 15-minute sync cycle that cut data staleness from 2–3
        days to under 30 minutes, saving roughly 5 hours a week.
      </>
    ),
    links: [
      {
        label: "Source",
        href: "https://github.com/ChinmayaBJ",
        variant: "ember",
        icon: "github",
      },
    ],
    image: "/assets/shots/netdash.webp",
    alt: "SAP Agent Catalog dashboard",
    objectClass: "object-top",
    body: [
      <p key="s1">
        Tracking 60+ internal AI agents in a SharePoint list meant catalog
        entries drifted out of date by {Em("2–3 days")}, discovery relied on
        manual keyword hunting, and onboarding a new agent was an untracked,
        ad-hoc process. The catalog replaces that workflow with a governed
        application on SAP BTP Cloud Foundry.
      </p>,
      <p key="s2">
        A {Em("15-minute sync cycle")} pulls agent metadata from source systems
        so the catalog reflects reality within half an hour rather than days.
        Semantic search lets teams find agents by capability instead of exact
        name, and a structured approval workflow makes registering or promoting
        an agent an auditable step rather than a spreadsheet edit.
      </p>,
      <p key="s3">
        The result cut data staleness from 2–3 days to under 30 minutes and
        saved roughly {Em("5 hours per week")} of manual catalog maintenance,
        while giving the organization a single governed source of truth for its
        agent fleet.
      </p>,
    ],
    highlights: [
      <>Governs 60+ internal AI agents on SAP BTP Cloud Foundry</>,
      <>15-minute sync cycle cut data staleness from 2–3 days to under 30 minutes</>,
      <>Semantic search by capability replaces manual keyword lookup</>,
      <>Structured approval workflow makes agent registration auditable</>,
      <>Saved ~5 hours/week of manual catalog maintenance</>,
    ],
    builtWith: [
      "SAP BTP",
      "Cloud Foundry",
      "Python",
      "Semantic Search",
      "REST APIs",
      "SAP HANA",
    ],
    next: { slug: "ransomware-detector", title: "Ransomware Detector" },
  },

  "ransomware-detector": {
    slug: "ransomware-detector",
    title: "Ransomware Detector",
    year: "2023",
    tagline: "Benchmarking 20+ ransomware variants — IEEE ICACRS",
    active: false,
    lead: (
      <>
        A systematic benchmarking study of enterprise ransomware detection and
        response, simulating 20+ variants — including LockBit, Ryuk, and
        WannaCry — under controlled conditions to measure time-to-detect,
        accuracy, and encryption speed. Published at IEEE ICACRS 2023 and cited
        by 7 papers, including Forensic Science International.
      </>
    ),
    links: [
      {
        label: "IEEE Paper",
        href: "https://ieeexplore.ieee.org",
        variant: "ember",
        icon: "arrow",
      },
    ],
    image: "/assets/shots/ransomware-detector.png",
    alt: "Encrypted files produced by a simulated ransomware run",
    objectClass: "object-center",
    team: "Benchmarked alongside Dell's Senior Architect to inform real enterprise threat modelling.",
    body: [
      <p key="r1">
        Enterprises choose detection and response platforms largely on vendor
        claims, with little controlled evidence on how they behave against
        modern ransomware. This study builds that evidence by simulating{" "}
        {Em("20+ ransomware variants")} — LockBit, Ryuk, WannaCry, and 17 others
        — in a contained environment and measuring how detection frameworks
        actually respond.
      </p>,
      <p key="r2">
        Each variant was executed under controlled conditions using tooling such
        as TeamViewer and 7z to stage realistic attack behaviour, while
        HostedScan was used to detect and categorize the resulting risks across
        levels, vulnerabilities, IPs, ports, and hostnames. For every run the
        study recorded {Em("time-to-detect, detection accuracy, and encryption-speed thresholds")}.
      </p>,
      <p key="r3">
        The measurements feed a {Em("risk-weighted selection model")} that helps
        enterprise security architects compare EDR platforms on observed
        behaviour rather than marketing. The work was published at IEEE ICACRS
        2023 and has since been cited by 7 papers, including Forensic Science
        International.
      </p>,
    ],
    highlights: [
      <>Simulated 20+ variants including LockBit, Ryuk, and WannaCry</>,
      <>Measured time-to-detect, accuracy, and encryption-speed thresholds</>,
      <>Risk-weighted selection model for comparing enterprise EDR platforms</>,
      <>Published at IEEE ICACRS 2023; cited by 7 papers</>,
      <>Benchmarked alongside Dell&apos;s Senior Architect</>,
    ],
    builtWith: [
      "Cybersecurity",
      "EDR",
      "HostedScan",
      "Threat Modelling",
      "TeamViewer",
      "Windows",
    ],
    next: { slug: "cat-net", title: "CAT-Net" },
  },
};

export const CASE_SLUGS = Object.keys(CASE_STUDIES);
