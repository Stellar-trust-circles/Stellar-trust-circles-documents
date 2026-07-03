from setuptools import setup, find_packages

setup(
    name="stellar-trust-circles",
    version="0.1.0",
    description="Python SDK for Stellar Trust Circles",
    author="Stellar Trust Circles Contributors",
    author_email="contributors@stellar-trust-circles.org",
    license="MIT",
    packages=find_packages(),
    python_requires=">=3.10",
    install_requires=[
        "stellar-sdk>=7.0.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "pytest-asyncio>=0.21.0",
            "mypy>=1.0.0",
            "ruff>=0.1.0",
        ],
    },
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Topic :: Software Development :: Libraries",
    ],
)
